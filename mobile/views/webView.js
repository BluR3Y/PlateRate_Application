import React, { useRef } from "react";
import { View, Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import { getUserInfo } from '../utilities/reduxFunctions';
// import { useSelector, useDispatch } from "react-redux";
// import { setUserId, setUserFirstName, setUserLastName, setUserEmail, setUserPhone, setUserImage } from '../redux/actions';

function LoginWebView({ webView, formType, navigation }) {

    // const dispatch = useDispatch();

    var webViewProps = {
        source: { uri: `https://platerate.com/users/${formType}` },
        javaScriptEnabled: true,
    }

    webViewProps.ref = ref => {
        webView = ref;
    }

    webViewProps.lastUrl = `https://platerate.com/users/${formType}`;

    webViewProps.onShouldStartLoadWithRequest = (event) => {
        const { url } = event;
        if(!url) { return false; }

        if(!url.includes('register') && !url.includes('login')) {
            if(url === 'https://platerate.com/' && webViewProps.lastUrl.includes('login')) {
                fetch('https://platerate.com/users/profile/detail')
                .then(async res => res.json())
                .then(localData => {

                    if(!localData) { return Promise.reject('user not logged in'); }

                    getUserInfo()
                    .then(async () => {
                        navigation.navigate('Home');
                        return false;
                    })
                })
                .catch(err => {
                    console.error(err);                    
                    const newURL = 'https://platerate.com/users/login';
                    const redirectTo = `window.location = '${newURL}'`;
                    webView.injectJavaScript(redirectTo);
                })
            }else{
                const newURL = 'https://platerate.com/users/login';
                const redirectTo = `window.location = '${newURL}'`;
                webView.injectJavaScript(redirectTo);
            }
        }

        webViewProps.lastUrl = url;

        console.log('cycle')

        return true;
    }

    return(
        <WebView {...webViewProps}/>
    );
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

// garrett@platerate.guru user_id: 59177f050c9db20629f49222