import React, { useRef } from "react";
import { View } from 'react-native';
import { WebView } from 'react-native-webview';
import { useSelector, useDispatch } from "react-redux";
import { setUserId, setUserFirstName, setUserLastName, setUserEmail } from '../redux/actions';
import bcrypt from 'bcryptjs';

function LoginWebView({ webView, formType, navigation }) {
    
    const dispatch = useDispatch();
    
    var webViewProps = {
        source: { uri: `https://platerate.com/users/${formType}` },
        javaScriptEnabled: true,
    };

    webViewProps.ref = ref => {
        webView = ref;
    }

    webViewProps.injectedJavaScript =  `
        document.getElementById('signin').addEventListener('submit', function(event) {
            event.preventDefault();
            let emailInput = document.getElementById('email');
            let passwordInput = document.getElementById('password');
            let email = emailInput.value;
            let password = passwordInput.value;
            emailInput.value = '';
            passwordInput.value = '';
            window.ReactNativeWebView.postMessage(JSON.stringify([email,password]));
        });
    `;

    webViewProps.stopPage = false;

    webViewProps.onMessage = event => {
        let userCredentials = JSON.parse(event.nativeEvent.data);

        fetch('https://platerate.com/user/validateEmail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: userCredentials[0],
            })
        })
        .then(async res => res.json())
        .then((data) => {
            if(!data['code']) {
                var hashedPword = data['data'].local.password;
                bcrypt.compare(userCredentials[1], hashedPword)
                .then((validation) => {
                    if(validation) {
                        dispatch(setUserId(data['data']._id));
                        dispatch(setUserEmail(data['data'].local.email));
                        dispatch(setUserFirstName(data['data'].profile.contactInfo.firstName));
                        dispatch(setUserLastName(data['data'].profile.contactInfo.lastName));

                        webViewProps.stopPage = true;

                        navigation.navigate('Home');
                    }
                })
            }

            webView.injectJavaScript(passCredentials(userCredentials[0],userCredentials[1]));
        })
    }

    webViewProps.onNavigationStateChange = newNavState => {
        if(webViewProps.stopPage) {webView.stopLoading()}
        const { url } = newNavState;
        if(!url) return;

        if(!url.includes('register') && !url.includes('login')) {
            const newURL = 'https://platerate.com/users/login';
            const redirectTo = `window.location = '${newURL}'`;
            webView.injectJavaScript(redirectTo);
            console.log('marker')
        }
    }

    const passCredentials = (email,password) => {
        return `
            document.getElementById('email').value = '${email}';
            document.getElementById('password').value = '${password}';
            document.getElementById('signin').submit();
        `;
    }

    return(
        <WebView {...webViewProps} />
    )
}

function ProfileWebView({ webView }) {
    
    var webViewProps = {
        source: { uri: `https://platerate.com/users/healthy-eating-profile` },
        javaScriptEnabled: true,
    };

    webViewProps.ref = ref => {
        webView = ref;
    }

    webViewProps.onNavigationStateChange = newNavState => {

        const { url } = newNavState;
        if(!url) return;


    }

    return(
        <WebView {...webViewProps} />
    );
}

export function WebViewScreen({ navigation, route }) {

    const webView = useRef(null);
    
    return(
        <View style={{flex:1}}>
            {route.params.viewType === 'accountAccess' && (
                <LoginWebView webView={webView} formType={route.params.formType} navigation={navigation} />
            )}
            {route.params.viewType === 'profile' && (
                <ProfileWebView webView={webView} />
            )}
        </View>
    );
}