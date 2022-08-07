import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, Button, Platform, StatusBar, TextInput } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { WebView } from 'react-native-webview';
import { SafeAreaView } from 'react-native-safe-area-context';
import Axios from 'axios';

function TestPickers({navigation}) {
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [text, setText] = useState('Empty');

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);

        let tempDate = new Date(currentDate);
        let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
        let fTime = 'Hours: ' + tempDate.getHours() + ' | Minutes: ' + tempDate.getMinutes();
        setText(fDate + '\n' + fTime);
        console.log(fDate + ' (' + fTime + ')');
    }

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    }

    const goHome = () => {
        navigation.navigate('Home');
    }
    
    return (
        <View style={styles.container}>
            <Text style={{fontWeight: 'bold', fontSize: 20}}>{text}</Text>
            <View style={{margin: 20}}>
                <Button title='DatePicker' onPress={() => showMode('date')} />
            </View>
            <View style={{margin: 20}}>
                <Button title='TimePicker' onPress={() => showMode('time')} />
            </View>

            {show && (
                <DateTimePicker
                    testID='dateTimePicker'
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display='default'
                    onChange={onChange}
                />
            )}
            <StatusBar style='auto' />
        
            <View style={{margin: 20}}>
                <Button title='Go To Home' onPress={() => goHome()}/>
            </View>
        </View>
    );
}

function TestWebView() {

    const [showWebView, setShowWebView] = useState(true);
    const [credentials, setCredentials] = useState(new Array());

    let webView = useRef();
    let webViewProps = { 
        source: { uri: 'https://platerate.com/users/login' } ,
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
            setCredentials(userCredentials);
            setShowWebView(false);
        }else{
            webView.injectJavaScript(passInvalidCredentials(userCredentials[0],userCredentials[1]));
        }
    }

    // if(Platform.OS === 'android') {
    //     webViewProps.onShouldStartLoadWithRequest = newNavState => {
    //         const { url } = newNavState;
    //         if(!url) return;


    //     }
    // }else{
    //     webViewProps.onNavigationStateChange = newNavState => {
    //         const { url } = newNavState;
    //         if(!url) return;

    //         if(!url.includes('register') && !url.includes('login')) {
    //             const newURL = 'https://platerate.com/users/login';
    //             const redirectTo = `window.location = '${newURL}'`;
    //             webView.injectJavaScript(redirectTo);   
    //         }
    //     }
    // }
    
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
        <SafeAreaView style={{flex:1}}>
            {showWebView && (
                <WebView {...webViewProps} />
            )}
            {!showWebView && (
                <Text style={{textAlign:'center', alignSelf: 'center', top:'50%', fontSize:20}}>{`${credentials}`}</Text>
            )}
        </SafeAreaView>
    );

}

function TestDataFetch() {

    const [loginUsername, setLoginUsername] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    const loginSubmit = () => {
        // Axios({
        //     method: 'post',
        //     url: 'https://platerate.com/users/login',
        //     data: {
        //         email: loginUsername,
        //         password: loginPassword,
        //     },
        //     withCredentials: true,
        // })
        // .then((res) => console.log(res.request.responseURL))
        fetch('https://platerate.com/users/login', {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: loginUsername,
                password: loginPassword,
            }),
        })
        .then((res) => console.log(res))
    }

    const getUser = () => {
        // Axios({
        //     method: 'post',
        //     url: 'https://platerate.com/orders/getRestaurantOrdersHistory',
        //     withCredentials: true,
        // })
        // .then((res) => console.log(res.data))
        fetch('https://platerate.com/orders/getRestaurantOrdersHistory', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((res) => console.log(res))
    }

    const getUserOrders = () => {
        // Axios({
        //     method: 'get',
        //     url: 'https://platerate.com/getUserOrders',
        //     withCredentials: true,
        // })
        // .then((res) => console.log(res.data))
        fetch('https://platerate.com/getUserOrders', {
            method: 'get',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
        .then((res) => res.json())
        .then((data) => console.log(data))
    }

    const getUserFriends = () => {
        // Axios({
        //     method: 'get',
        //     url: 'https://platerate.com/userfriends/friends',
        //     withCredentials: true,
        // })
        // .then((res) => console.log(res.data))
        fetch('https://platerate.com/userfriends/friends', {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((res) => res.json())
        .then((data) => console.log(data))
    }

    const getUserSettings = () => {
        // Axios({
        //     method: 'get',
        //     url: 'https://platerate.com/platerateadmin/getsettings',
        //     withCredentials: true,
        // })
        // .then((res) => console.log(res.data))
        fetch('https://platerate.com/platerateadmin/getsettings', {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((res) => res.json())
        .then((data) => console.log(data))
    }

    return(
        <View style={{flex:1, flexDirection:'column', justifyContent: 'center'}}>
            <View style={{height: 100, backgroundColor: 'red'}}>
                <Text style={{fontSize:30, alignSelf: 'center'}}>Login</Text>
                <View style={{flex:1, flexDirection: 'row', justifyContent: 'space-evenly', backgroundColor: 'green'}}>
                    <TextInput
                        style={{fontSize:25}}
                        placeholder='username'
                        onChangeText={setLoginUsername}
                    />
                    <TextInput
                        style={{fontSize: 25}}
                        placeholder='password'
                        onChangeText={setLoginPassword}
                    />
                </View>
            </View>
            <View style={{height: 60, backgroundColor: 'red'}}>
            <Button
                        title='sign in'
                        onPress={loginSubmit}
                    />
                    <Button
                        title='Get User'
                        onPress={getUser}
                    />
                    <Button
                        title='Get User Orders'
                        onPress={getUserOrders}
                    />
                    <Button
                        title='Get User Friends'
                        onPress={getUserFriends}
                    />
                    <Button
                        title='Get User Settings'
                        onPress={getUserSettings}
                    />
            </View>
        </View>
    );
}

export function TestView({navigation}) {
    return(
        <>
            {/* <TestPickers navigation={navigation} /> */}
            {/* <TestWebView/> */}
            <TestDataFetch/>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:  '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
});