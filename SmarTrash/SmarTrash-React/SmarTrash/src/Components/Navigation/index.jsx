import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import SignInScreen from '../../screens/SignInScreen/SignInScreen';


const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer >
    <Stack.Navigator>
      <Stack.Screen name="SignInScreen" component={SignInScreen} />
     
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation