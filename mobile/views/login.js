// import React, { useRef } from "react";
// import { View } from 'react-native';
// import { WebView } from 'react-native-webview';
// import { useSelector, useDispatch } from "react-redux";
// import { setUserId, setUserFirstName, setUserLastName, setUserEmail } from '../redux/actions';
// import bcrypt from 'bcryptjs';

// export function Login({ navigation, route }) {

//     const dispatch = useDispatch();

//     var webView = useRef();
//     var webViewProps = {
//         source: { uri: `https://platerate.com/users/${(route.params.formType === 'login' ? 'login' : 'register')}` },
//         javaScriptEnabled: true,
//     };

//     webViewProps.ref = ref => {
//         webView = ref;
//     }

//     webViewProps.injectedJavaScript =  `
//         document.getElementById('signin').addEventListener('submit', function(event) {
//             event.preventDefault();
//             let emailInput = document.getElementById('email');
//             let passwordInput = document.getElementById('password');
//             let email = emailInput.value;
//             let password = passwordInput.value;
//             emailInput.value = '';
//             passwordInput.value = '';
//             window.ReactNativeWebView.postMessage(JSON.stringify([email,password]));
//         });
//     `;

//     webViewProps.onMessage = event => {
//         let userCredentials = JSON.parse(event.nativeEvent.data);

//         fetch('https://platerate.com/user/validateEmail', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 email: userCredentials[0],
//             })
//         })
//         .then(async res => res.json())
//         .then((data) => {
//             if(!data['code']) {
//                 var hashedPword = data['data'].local.password;
//                 console.log(data['data']);
//                 bcrypt.compare(userCredentials[1],hashedPword)
//                 .then((validation) => {
//                     if(validation) {
//                         dispatch(setUserId(data['data']._id));
//                         dispatch(setUserEmail(data['data'].local.email));
//                         dispatch(setUserFirstName(data['data'].profile.contactInfo.firstName));
//                         dispatch(setUserLastName(data['data'].profile.contactInfo.lastName));
//                         navigation.navigate('Home');
//                     }else{
//                         webView.injectJavaScript(passCredentials(userCredentials[0],userCredentials[1]));
//                     }
//                 })

//             }else{
//                 webView.injectJavaScript(passCredentials(userCredentials[0],userCredentials[1]));
//             }
//         })
//     }

//     webViewProps.onNavigationStateChange = newNavState => {

//         const { url } = newNavState;
//         if(!url) return;

//         if(!url.includes('register') && !url.includes('login')) {
//             const newURL = 'https://platerate.com/users/login';
//             const redirectTo = `window.location = '${newURL}'`;
//             webView.injectJavaScript(redirectTo);
//         }
//     }

//     const passCredentials = (email,password) => {
//         return `
//             document.getElementById('email').value = '${email}';
//             document.getElementById('password').value = '${password}';
//             document.getElementById('signin').submit();
//         `;
//     }

//     return(
//         <View style={{flex: 1}}>
//             <WebView {...webViewProps} />
//         </View>
//     );
// }