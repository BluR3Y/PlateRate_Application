// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, Platform } from 'react-native';
// import styles from '../styles/authStyles';

// const API_URL = Platform.OS === 'ios' ? 'http://localhost:5000' : 'http://10.0.2.2:5000';

// export function AuthView({ navigation }) {

//     const [email, setEmail] = useState('');
//     const [name, setName] = useState('');
//     const [password, setPassword] = useState('');

//     const [isError, setIsError] = useState(false);
//     const [message, setMessage] = useState('');
//     const [isLogin, setIsLogin] = useState(true);

//     const onChangeHandler = () => {
//         setIsLogin(!isLogin);
//         setMessage('');
//     };

//     const onLoggedIn = token => {
//         fetch(`${API_URL}/private`, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${token}`,
//             },
//         })
//         .then(async res => {
//             try {
//                 const jsonRes = await res.json();
//                 if(res.status === 200) {
//                     setMessage(jsonRes.message);
//                 }
//             } catch (err) {
//                 console.log(err);
//             };
//         })
//         .catch(err => {
//             console.log(err);
//         });
//     }

//     const onSubmitHandler = () => {
//         const payload = {
//             email,
//             name,
//             password,
//         };
//         fetch(`${API_URL}/${isLogin ? 'login' : 'signup'}`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(payload),
//         })
//         .then(async res => {
//             try {
//                 const jsonRes = await res.json();
//                 if(res.status !== 200) {
//                     setIsError(true);
//                     setMessage(jsonRes.message);
//                 }else{
//                     onLoggedIn(jsonRes.token);
//                     setIsError(false);
//                     setMessage(jsonRes.message);
//                 }
//                 console.log(jsonRes.message);
//             } catch (err) {
//                 console.log(err);
//             };
//         })
//         .catch(err => {
//             console.log(err);
//         });
//     };

//     const getMessage = () => {
//         const status = isError ? `Error: ` : `Success: `;
//         return status + message;
//     }   

//     return (
//         <View style={styles.card}>
//             <Text style={styles.heading}>{isLogin ? 'Login' : 'Signup'}</Text>
//             <View style={styles.form}>
//                 <View style={styles.inputs}>
//                     <TextInput
//                         style={styles.input}
//                         placeholder="Email"
//                         autoCapitalize='none'
//                         onChangeText={setEmail}
//                     />
//                     {!isLogin && 
//                         <TextInput
//                             style={styles.input}
//                             placeholder='Name'
//                             onChangeText={setName}
//                         />
//                     }
//                     <TextInput
//                         secureTextEntry={true}
//                         style={styles.input}
//                         placeholder='Password'
//                         onChangeText={setPassword}
//                     />
//                     <Text
//                         style={[styles.message, {color: isError ? 'red' : 'green'}]}
//                     >
//                         {message ? getMessage() : null}
//                     </Text>
//                     <TouchableOpacity
//                         style={styles.button}
//                         onPress={onSubmitHandler}
//                     >
//                         <Text style={styles.buttonText}>Done</Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity
//                         style={styles.buttonAlt}
//                         onPress={onChangeHandler}
//                     >
//                         <Text style={styles.buttonAltText}>
//                             {isLogin ? 'Sign Up' : 'Log In'}
//                         </Text>
//                     </TouchableOpacity>
//                 </View>
//             </View>
//         </View>
//     );
// };

// export default AuthView;