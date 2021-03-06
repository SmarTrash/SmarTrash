import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import SignUpScreen from '../../screens/SignUpScreen/SignUpScreen';
import SignInScreen from '../../screens/SignInScreen/SignInScreen';
import ForgotPasswordScreen from '../../screens/ForgotPasswordScreen/ForgotPasswordScreen';
import Home from '../../screens/HomeScreen/Home';
import SelectedGift from '../../screens/GiftScreen/SelectedGift';
import GiftsPage from '../../screens/GiftScreen/GiftsPage';
import EditProfile from '../../screens//EditProfile/EditProfile'
import ApprovedPurchase from '../../screens/GiftScreen/ApprovedPurchase';
import GiftPurchase from '../../screens/GiftScreen/GiftPurchase';
import ReceptBin from '../../screens/ThrowGarbage/ReceptBin';
import ThrowPoints from '../../screens/ThrowGarbage/ThrowPoints';
import CompetitionList from '../../screens/Competition/CompetitionList';
import CameraScreen from '../../screens/EditImage/CameraScreen'
import PushPage from '../../Components/PushNotification/PushPage';
import Map from '../../screens/MapScreen/Map';
import BinListScreen from '../../screens/ListBin/BinListScreen';
import AddNewAdress from '../../screens/GiftScreen/AddNewAdress';
import QRScanner from '../../screens/QRScanner/QRScanner';
import Start from '../../screens/GameScreen/Start'
import Game from '../../screens/GameScreen/Game'
import GameOver from '../../screens/GameScreen/GameOver'
import EditImage from '../../screens/EditImage/EditImage';
import BinCameraScreen from '../../screens/FindBin/BinCameraScreen'
import BinPicture from '../../screens/FindBin/BinPicture';
import OrderListScreen from '../../screens/OrderList/OrderListScreen';
import SelectBinsOption from '../../screens/SelectBinsOption/SelectBinsOption';

const Stack = createNativeStackNavigator();

const Navigation = () => {

  return (

    <NavigationContainer  >
      <Stack.Navigator initialRouteName="SignInScreen" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        <Stack.Screen name="SignInScreen" component={SignInScreen} />
        <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="GiftsPage" component={GiftsPage} />
        <Stack.Screen name="SelectedGift" component={SelectedGift} />
        <Stack.Screen name="OrderListScreen" component={OrderListScreen} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="GiftPurchase" component={GiftPurchase} />
        <Stack.Screen name="ApprovedPurchase" component={ApprovedPurchase} />
        <Stack.Screen name="ReceptBin" component={ReceptBin} />
        <Stack.Screen name="ThrowPoints" component={ThrowPoints} />
        <Stack.Screen name="CompetitionList" component={CompetitionList} />
        <Stack.Screen name="CameraScreen" component={CameraScreen} />
        <Stack.Screen name="Map" component={Map} />
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Game" component={Game} />
        <Stack.Screen name="EditImage" component={EditImage} />
        <Stack.Screen options={{ headerShown: true }} name="GameOver" component={GameOver} />
        <Stack.Screen options={{ headerShown: true }} name="PushPage" component={PushPage} />
        <Stack.Screen name="BinListScreen" component={BinListScreen} />
        <Stack.Screen name="AddNewAdress" component={AddNewAdress} />
        <Stack.Screen name="QRScanner" component={QRScanner} />
        <Stack.Screen name="BinCameraScreen" component={BinCameraScreen} />
        <Stack.Screen name="BinPicture" component={BinPicture} />
        <Stack.Screen name="SelectBinsOption" component={SelectBinsOption} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation