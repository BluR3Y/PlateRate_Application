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
import { ViewProfile } from './views/viewProfile';
import { TestView } from './views/tester';

import Hamburger from './content/images/hamburger.svg';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator()

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
    <View style={{flex:1}}>
      {!props.userInfo && (
        <>
          <TouchableOpacity 
            style={styles.guestOptionBtn}
            onPress={() => {
              props.navigation.navigate('Login', { formType: 'login', setUserInfo: props.setUserInfo });
            }}  
          >
            <Text style={styles.guestLabel}>Log In</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.guestOptionBtn}
            onPress={() => {
              props.navigation.navigate('Login', { formType: 'signup', setUserInfo: props.setUserInfo });
            }}
          >
            <Text style={styles.guestLabel}>Sign Up</Text>
          </TouchableOpacity>
        </>
      )}
      {props.userInfo && (
        <View style={styles.userContainer}>
          <View style={styles.userInfoCont}>
            <Image
              style={styles.userProfileImg}
              source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
            />
            <View style={styles.userNameCont}>
              <Text numberOfLines={1} style={styles.userNameText}>Rey Hector Flores</Text>
              <View style={styles.userOptionsCont}>
                <TouchableOpacity 
                  style={{flex: 1}}
                  onPress={() => {
                    props.navigation.navigate('Profile');
                  }}
                >
                  <Text style={styles.userOptionText}>Profile</Text>
                </TouchableOpacity>
                <View style={{height: '80%', width: 1, backgroundColor: '#979797'}}/>
                <TouchableOpacity 
                  style={{flex: 1}}
                  onPress={() => props.setUserInfo(null)} 
                >
                  <Text style={[styles.userOptionText, {marginLeft: 20}]}>Logout</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.ScreenList}>
            <TouchableOpacity style={styles.screenItem}>
              <Text style={{fontSize: 22, color: '#02843D'}}>Current Orders</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.screenItem}>
              <Text style={{fontSize: 22, color: '#4A4A4A'}}>Waitstaff Screen</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.screenItem}>
              <Text style={{fontSize: 22, color: '#4A4A4A'}}>Bar/Kitchen Screen</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.screenItem}>
              <Text style={{fontSize: 22, color: '#4A4A4A'}}>Delivery person Screen</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.screenItem}>
              <Text style={{fontSize: 22, color: '#4A4A4A'}}>Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.screenItem}>
              <Text style={{fontSize: 22, color: '#4A4A4A'}}>Closed Orders</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.screenItem}>
              <Text style={{fontSize: 22, color: '#F64646'}}>Exit</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
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
        <Drawer.Screen name='Profile' component={ViewProfile} />
        <Drawer.Screen name='Test' component={TestView} />
      </Drawer.Navigator>
    </NavigationContainer>
  )
}