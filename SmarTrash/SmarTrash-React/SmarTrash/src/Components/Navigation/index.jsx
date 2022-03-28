import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import SignUpScreen from '../../screens/SignUpScreen/SignUpScreen';
import SignInScreen from '../../screens/SignInScreen/SignInScreen';
import ForgotPasswordScreen from '../../screens/ForgotPasswordScreen/ForgotPasswordScreen';
import ResetPassword from '../../screens/ForgotPasswordScreen/ResetPassword';
<<<<<<< HEAD
import Home from '../../screens/HomeScreen/Home';
import SelectedGift from '../../screens/GiftScreen/SelectedGift';
import GiftsPage from '../../screens/GiftScreen/GiftsPage';

=======
>>>>>>> parent of d8c6e58 (Merge branch 'main' of https://github.com/SmarTrash/SmarTrash)
const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer >
    <Stack.Navigator initialRouteName="SignInScreen" >
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      <Stack.Screen name="SignInScreen" component={SignInScreen} />
      <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
<<<<<<< HEAD
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="GiftsPage" component={GiftsPage} />
      <Stack.Screen name="SelectedGift" component={SelectedGift} />
      
=======
>>>>>>> parent of d8c6e58 (Merge branch 'main' of https://github.com/SmarTrash/SmarTrash)
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation