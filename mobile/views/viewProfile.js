// import React, { useRef } from 'react';
// import { View } from 'react-native'; 
// import { useSelector } from 'react-redux';

// import { WebView } from 'react-native-webview';

// export function ViewProfile({ navigation, route }) {

//     const { userId } = useSelector(state => state.userReducer);
//     console.log(userId)

//     var webView = useRef();
//     var webViewProps = {
//         source: { uri: `https://staging.platerate.guru/publicprofile/${userId}` },
//         javaScriptEnabled: true,
//     };

//     webViewProps.ref = ref => {
//         webView = ref;
//     }

//     webViewProps.onNavigationStateChange = newNavState => {

//         const { url } = newNavState;
//         if(!url) return;
        
//         if(!url.includes('login') && !url.includes('register') && !url.includes('healthy-eating-profile') && !url.includes('password/change')) {
//             webView.injectJavaScript(` window.location = 'https://platerate.com/users/healthy-eating-profile'; `);
//         }
//     }

//     return(
//         <View style={{flex:1}}>
//             <WebView {...webViewProps} />
//         </View>
//     );
// }