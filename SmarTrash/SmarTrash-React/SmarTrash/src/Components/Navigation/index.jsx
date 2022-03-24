import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import SignUpScreen from '../../screens/SignUpScreen/SignUpScreen';
import SignInScreen from '../../screens/SignInScreen/SignInScreen';
import ForgotPasswordScreen from '../../screens/ForgotPasswordScreen/ForgotPasswordScreen';
import ResetPassword from '../../screens/ForgotPasswordScreen/ResetPassword';
import HomePage from '../../screens/HomePage/HomePage';
import Home2 from '../../screens/HomeScreen/Home2';
import SelectedGift from '../../screens/GiftScreen/SelectedGift';
import GiftsPage from '../../screens/GiftScreen/GiftsPage';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer >
    <Stack.Navigator initialRouteName="GiftsPage" >
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      <Stack.Screen name="SignInScreen" component={SignInScreen} />
      <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
      <Stack.Screen name="HomePage" component={HomePage} />
      <Stack.Screen name="Home2" component={Home2} />
      <Stack.Screen name="GiftsPage" component={GiftsPage} />
      <Stack.Screen name="SelectedGift" component={SelectedGift} />
      
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation