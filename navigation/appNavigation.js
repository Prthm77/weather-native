import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../pages/Home';


const Stack = createNativeStackNavigator();

function AppNavigation() {
  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Home" options={{headerShown : false}} component={Home} />
    </Stack.Navigator>
  </NavigationContainer>
  )
}

export default AppNavigation