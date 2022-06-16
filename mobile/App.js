import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { AuthView, authView } from './views/authView';
import { HomeView } from './views/homeView';
import { TestView } from './views/tester';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}} // removes the header visible at the top of each Page
      >
        {/* <Stack.Screen
          name='Auth View'
          component={AuthView}
        /> */}
        {/* <Stack.Screen
          name='Home View'
          component={HomeView}
        /> */}
        <Stack.Screen
          name='Test View'
          component={TestView}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;