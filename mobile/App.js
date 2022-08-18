import React, {useState} from 'react';
import 'react-native-gesture-handler';

import { Text } from 'react-native';
import { DrawerActions,  NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, useDrawerStatus, DrawerItem } from '@react-navigation/drawer';

import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';
import { Provider } from 'react-redux';

import { DrawerHeader, DrawerContent } from './views/DrawerContent';
import { HomeView } from './views/homeView';
import { WebViewScreen } from './views/webView';
import { TestView } from './views/tester';
import { WaitStaffView } from './views/waitStaff';
import { getUserInfo } from './utilities/reduxFunctions';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator()

const navigationListeners = ({ navigation, route }) => {
  return ({
    focus: (e) => {
      getUserInfo();
    }
  });
}

export default function App() {

  return (
    <Provider store={store}>
      <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
        <NavigationContainer>
            <Drawer.Navigator
              initialRouteName='Home'
              screenOptions={{
                drawerPosition: 'right', 
                header: (props) => {return <DrawerHeader {...props} />}
              }}
              screenListeners={navigationListeners}
              drawerContent={(props) => {
                return <DrawerContent {...props} />
              }}
            >
              <Drawer.Screen name='Home' component={HomeView} />
              <Drawer.Screen name='WebView' component={WebViewScreen} />
              <Drawer.Screen name='Test' component={TestView} />
              <Drawer.Screen name='WaitStaff' component={WaitStaffView} />
            </Drawer.Navigator>
          </NavigationContainer>
      </PersistGate>
    </Provider>
  )
};

