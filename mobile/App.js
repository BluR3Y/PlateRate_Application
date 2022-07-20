import React, {useState} from 'react';
import 'react-native-gesture-handler';

import { DrawerActions,  NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, useDrawerStatus, DrawerItem } from '@react-navigation/drawer';

import { Provider } from 'react-redux';
import { Store } from './redux/store';

import { DrawerHeader, DrawerContent } from './views/DrawerContent';
import { HomeView } from './views/homeView';
import { Login } from './views/login';
import { ViewProfile } from './views/viewProfile';
import { TestView } from './views/tester';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator()

export default function App() {

  const [userInfo, setUserInfo] = useState(null);

  return (
    <Provider store={Store}>
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
    </Provider>
  )
};

