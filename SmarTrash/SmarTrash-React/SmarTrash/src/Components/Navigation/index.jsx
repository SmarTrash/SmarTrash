import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import SignUpScreen from '../../screens/SignUpScreen/SignUpScreen';
import SignInScreen from '../../screens/SignInScreen/SignInScreen';
import ForgotPasswordScreen from '../../screens/ForgotPasswordScreen/ForgotPasswordScreen';
import ResetPassword from '../../screens/ForgotPasswordScreen/ResetPassword';
import Home from '../../screens/HomeScreen/Home';
import SelectedGift from '../../screens/GiftScreen/SelectedGift';
import GiftsPage from '../../screens/GiftScreen/GiftsPage';
import Notifications from '../../screens/Notifications/Notifications'
import EditProfile from '../../screens//EditProfile/EditProfile'
const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer  >
<<<<<<< Updated upstream
      <Stack.Navigator initialRouteName="Home" >
=======
      <Stack.Navigator initialRouteName="SignInScreen" >
>>>>>>> Stashed changes
        <Stack.Screen options={{ headerShown: false }} name="SignUpScreen" component={SignUpScreen} />
        <Stack.Screen options={{ headerShown: false }} name="SignInScreen" component={SignInScreen} />
        <Stack.Screen options={{ headerShown: false }} name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
        <Stack.Screen options={{ headerShown: false }} name="ResetPassword" component={ResetPassword} />
        <Stack.Screen options={{ headerShown: false }} name="Home" component={Home} />
        <Stack.Screen options={{ headerShown: false }} name="GiftsPage" component={GiftsPage} />
        <Stack.Screen options={{ headerShown: false }} name="SelectedGift" component={SelectedGift} />
        <Stack.Screen options={{ headerShown: false }} name="Notifications" component={Notifications} />
        <Stack.Screen options={{ headerShown: false }} name="EditProfile" component={EditProfile} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation