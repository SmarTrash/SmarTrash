import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import SignInScreen from './src/screens/SignInScreen'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegistrationPage from './ScreenPages/RegistrationPage';
import SignInPage from './ScreenPages/SignInPage';
import GiftPage from './ScreenPages/GiftPage';
import SelectedGift from './ScreenPages/SelectedGift';

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    
    <View style={styles.root} >
      <SignInScreen/>
      <NavigationContainer>
      <Stack.Navigator initialRouteName="GiftPage">
        <Stack.Screen name="RegistrationPage" component={RegistrationPage} />
        <Stack.Screen name="SignInPage" component={SignInPage} />
        <Stack.Screen name="GiftPage" component={GiftPage} />
        <Stack.Screen name="SelectedGift" component={SelectedGift} />
      </Stack.Navigator>
    </NavigationContainer>
    </View>
  )
}

const styles=StyleSheet.create({
  root:{
    flex:1,
    backgroundColor: '#F9FBFC'

  }
})