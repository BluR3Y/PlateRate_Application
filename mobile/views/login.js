import React, { useRef } from "react";
import { View } from 'react-native';

import { WebView } from 'react-native-webview';

export function Login({ navigation, route }) {

    var webView = useRef();
    var webViewProps = {
        source: { uri: `https://platerate.com/users/${(route.params.formType === 'login' ? 'login' : 'register')}` },
        javaScriptEnabled: true,
        injectedJavaScript: getSubmitted
    };

    webViewProps.ref = ref => {
        webView = ref;
    }

    webViewProps.injectedJavaScript =  `
        document.getElementById('signin').addEventListener('submit', function(event) {
            event.preventDefault();
            let email = document.getElementById('email').value;
            let password = document.getElementById('password').value;
            window.ReactNativeWebView.postMessage(JSON.stringify([email,password]));
        });
    `;

    webViewProps.onMessage = event => {
        let userCredentials = JSON.parse(event.nativeEvent.data);
        
        // fetch from db and check if credentials are valid

        if(true) {
            route.params.setUserInfo(userCredentials);
            navigation.navigate('Home');
        }else{
            webView.injectJavaScript(passInvalidCredentials(userCredentials[0],userCredentials[1]));
        }
    }

    webViewProps.onNavigationStateChange = newNavState => {
        console.log(newNavState);

        const { url } = newNavState;
        if(!url) return;

        if(!url.includes('register') && !url.includes('login')) {
            const newURL = 'https://platerate.com/users/login';
            const redirectTo = `window.location = '${newURL}'`;
            webView.injectJavaScript(redirectTo);
        }
    }

    const getSubmitted = `
        document.getElementById('signin').addEventListener('submit', function(event) {
            event.preventDefault();
            let email = document.getElementById('email').value;
            let password = document.getElementById('password').value;
            window.ReactNativeWebView.postMessage(JSON.stringify([email,password]));
        });
    `;

    const passInvalidCredentials = (email,password) => {
        return `
            document.getElementById('email').value = '${email}';
            document.getElementById('password').value = '${password}';
            document.getElementById('signin').submit();
        `;
    }

    return(
        <View style={{flex: 1}}>
            <WebView {...webViewProps} />
        </View>
    );
}