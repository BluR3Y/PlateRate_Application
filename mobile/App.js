import React, {useState} from 'react';
import 'react-native-gesture-handler';
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity 
} from 'react-native';

import { 
  DrawerActions, 
  NavigationContainer 
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { 
  createDrawerNavigator, 
  useDrawerStatus,
  DrawerItem
} from '@react-navigation/drawer';

import { styles } from './styles/drawerStyles';
import { HomeView } from './views/homeView';
import { Login } from './views/login';
import { TestView } from './views/tester';

import Hamburger from './content/images/hamburger.svg';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator()

// const App = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator
//         screenOptions={{headerShown: false}} // removes the header visible at the top of each Page
//       >
//         {/* <Stack.Screen
//           name='Auth View'
//           component={AuthView}
//         /> */}
//         <Stack.Screen
//           name='Home View'
//           component={HomeView}
//         />
//         {/* <Stack.Screen
//           name='Test View'
//           component={TestView}
//         /> */}
//       </Stack.Navigator>
//     </NavigationContainer>
//   )
// }

// const App = () => {
//   return (
//     <NavigationContainer>
//       <Drawer.Navigator screenOptions={{headerShown: false, drawerPosition: 'right'}} initialRouteName='Tester'>
//         <Drawer.Screen name='Home' component={HomeView} />
//         <Drawer.Screen name='Tester' component={TestView} />
//       </Drawer.Navigator>
//     </NavigationContainer>
//   );
// }



// function CustomDrawerContent(props) {
  // const width = useWindowDimensions().width * 0.3;

  // return (
  //   <DrawerContentScrollView{...props}>
  //     <View style={{position:'absolute', width:50, height: 50, backgroundColor: 'red'}}>

  //     </View>
  //   </DrawerContentScrollView>
  // );
// }

// const MyHeader = () => {
  // return(
  //   <View style={{width: '100%', height: 30, backgroundColor: 'red'}}>
  //     <Text>Hello</Text>
  //   </View>
  // );
// }

// function MyDrawer() {
//   return (
//     <Drawer.Navigator
//       drawerContent={(props) => <CustomDrawerContent {...props}/>}
//       screenOptions={{ drawerPosition: 'right', header: () => {return <MyHeader/>}}}
//     >
//       <Drawer.Screen name='Home' component={HomeView} />
//     </Drawer.Navigator>
//   )
// }

const DrawerHeader = (props) => {
  
  return (
    <View style={styles.header}>
      <Image
          style={styles.headerLogo}
          source={require('./content/images/platerate_logo.png')}
      />
      <Image
          style={styles.headerAward}
          source={require('./content/images/award.png')}
      />

      <TouchableOpacity style={styles.hamburgerCont} onPress={() => props.navigation.toggleDrawer()}>
        <Hamburger width={35} height={35} fill={'#4A4A4A'}/>
      </TouchableOpacity>

    </View>
  );
}

const DrawerContent = (props) => {

  return(
    <View style={{flex:1, flexDirection: 'column'}}>
      <View style={styles.credentialsCont}>
        {!props.userInfo && (
          <>
            <DrawerItem
              style={styles.credentialItem}
              label={'Log In'}
              labelStyle={styles.credentialLabel}
              onPress={() => {
                props.navigation.navigate('Login', { formType: 'login', setUserInfo: props.setUserInfo });
              }}
            />
            <DrawerItem 
              style={styles.credentialItem}
              label={'Sign Up'}
              labelStyle={styles.credentialLabel}
              onPress={() => {
                props.navigation.navigate('Login', { formType: 'signup', setUserInfo: props.setUserInfo });
              }}
            />
          </>
        )}
        {props.userInfo && (
          <DrawerItem
            style={styles.credentialItem}
            label={'Log Out'}
            labelStyle={[styles.credentialLabel, {marginLeft: '40%'}]}
            onPress={() => {
              props.setUserInfo(null);
            }}
          />
        )}
      </View>
    </View>
  );
}

export default function App() {

  const [userInfo, setUserInfo] = useState(null);

  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName='Home'
        screenOptions={{
          drawerPosition: 'right', 
          header: (props) => {return <DrawerHeader {...props} />}
        }}
        drawerContent={(props) => {
          props.userInfo = userInfo;
          props.setUserInfo = setUserInfo;
          return <DrawerContent {...props} />
        }}
      >
        <Drawer.Screen name='Home' component={HomeView} />
        <Drawer.Screen name='Login' component={Login} />
        <Drawer.Screen name='Test' component={TestView} />
      </Drawer.Navigator>
    </NavigationContainer>
  )
}