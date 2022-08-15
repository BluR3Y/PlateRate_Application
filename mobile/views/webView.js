import React, { useRef } from "react";
import { View, Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import { useSelector, useDispatch } from "react-redux";
import { setUserId, setUserFirstName, setUserLastName, setUserEmail, setUserPhone, setUserImage } from '../redux/actions';

function LoginWebView({ webView, formType, navigation }) {

    const dispatch = useDispatch();

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

                    fetch('https://platerate.com/user/validateEmail', {
                        method: 'post',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            email: localData.local.email,
                        })
                    })
                    .then(async res => {
                        if(!res.ok) { return Promise.reject('failed to validate email'); }
                        return res.json();
                    })
                    .then(userData => {
                        var userProfile = userData.data.profile;
                        var userContactInfo = userProfile.contactInfo;
                        var imageUrl = userProfile.imageUrl;
                        console.log('before marker')
                        dispatch(setUserId(userData.data._id));
                        console.log(userData);
    
                        dispatch(setUserFirstName(userContactInfo.firstName));
                        dispatch(setUserLastName(userContactInfo.lastName));
                        dispatch(setUserImage(imageUrl ? imageUrl : 'https://platerate.com/images/avatar.png'));
    
                        if(localData.local.email) {
                            dispatch(setUserEmail(localData.local.email));
                        }
    
                        if(localData.local.phone) {
                            dispatch(setUserPhone(localData.local.phone));
                        }
    
                        navigation.navigate('Home');
                        console.log('another marker')
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