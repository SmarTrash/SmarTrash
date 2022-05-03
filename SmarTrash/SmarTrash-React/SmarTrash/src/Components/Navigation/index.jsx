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
import ApprovedPurchase from '../../screens/GiftScreen/ApprovedPurchase';
import GiftPurchase from '../../screens/GiftScreen/GiftPurchase';
import ReceptBin from '../../screens/ThrowGarbage/ReceptBin';
import ThrowPoints from '../../screens/ThrowGarbage/ThrowPoints';
import CompetitionList from '../../screens/Competition/CompetitionList';
import CameraScreen from '../../screens/CameraScreen/CameraScreen';

import Map from '../../screens/MapScreen/Map';


const Stack = createNativeStackNavigator();

const Navigation = () => {
 
  return (

    <NavigationContainer  >
      <Stack.Navigator initialRouteName="SignInScreen" >
        <Stack.Screen options={{ headerShown: false }} name="SignUpScreen" component={SignUpScreen} />
        <Stack.Screen options={{ headerShown: false }} name="SignInScreen" component={SignInScreen} />
        <Stack.Screen options={{ headerShown: false }} name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
        <Stack.Screen options={{ headerShown: false }} name="ResetPassword" component={ResetPassword} />
        <Stack.Screen options={{ headerShown: false }} name="Home" component={Home} />
        <Stack.Screen options={{ headerShown: false }} name="GiftsPage" component={GiftsPage} />
        <Stack.Screen options={{ headerShown: false }} name="SelectedGift" component={SelectedGift} />
        <Stack.Screen options={{ headerShown: false }} name="Notifications" component={Notifications} />
        <Stack.Screen options={{ headerShown: false }} name="EditProfile" component={EditProfile} />
        <Stack.Screen options={{ headerShown: false }} name="GiftPurchase" component={GiftPurchase} />
        <Stack.Screen options={{ headerShown: false }} name="ApprovedPurchase" component={ApprovedPurchase} />
        <Stack.Screen options={{ headerShown: false }} name="ReceptBin" component={ReceptBin} />
        <Stack.Screen options={{ headerShown: false }} name="ThrowPoints" component={ThrowPoints} />
        <Stack.Screen options={{ headerShown: false }} name="CompetitionList" component={CompetitionList} />
        <Stack.Screen options={{ headerShown: false }} name="CameraScreen" component={CameraScreen} />
        <Stack.Screen options={{ headerShown: true }} name="Map" component={Map} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation