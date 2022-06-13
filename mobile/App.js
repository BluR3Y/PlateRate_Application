import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { LoginView } from './views/login';
import { HomeView } from './views/home';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}} // removes the header visible at the top of each Page
      >
        <Stack.Screen
          name='Login View'
          component={LoginView}
        />
        <Stack.Screen
          name='Home View'
          component={HomeView}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;