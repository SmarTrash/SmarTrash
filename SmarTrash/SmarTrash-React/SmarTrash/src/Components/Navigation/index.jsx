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
import PushPage from '../../Components/PushNotification/PushPage';
import BinCameraScreen from '../../screens/ThrowGarbage/BinCameraScreen';
import Map from '../../screens/MapScreen/Map';
import BinListScreen from '../../screens/ListBin/BinListScreen';
import AddNewAdress from '../../screens/GiftScreen/AddNewAdress';
import QRScanner from '../../screens/QRScanner/QRScanner';

//import NavigationMap from '../../screens/MapScreen/NavigationMap'
// import IdentifyImage from '../../screens/IdentifyImage/IdentifyImage'

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
        {/* <Stack.Screen options={{ headerShown: true }} name="NavigationMap" component={NavigationMap} /> */}
        <Stack.Screen options={{ headerShown: true }} name="PushPage" component={PushPage} />
        <Stack.Screen options={{ headerShown: false }} name="BinCameraScreen" component={BinCameraScreen} />
        <Stack.Screen options={{ headerShown: false }} name="BinListScreen" component={BinListScreen} />
        <Stack.Screen options={{ headerShown: false }} name="AddNewAdress" component={AddNewAdress} />
        <Stack.Screen options={{ headerShown: false }} name="QRScanner" component={QRScanner} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation