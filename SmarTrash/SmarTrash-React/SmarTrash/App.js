import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUpScreen from './src/screens/SignUpScreen';
import NewGiftPage from './src/screens/GiftScreen/NewGiftPage';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';



const Stack = createNativeStackNavigator();
export default function App() {
  return (
    
    <View style={styles.root} >
      <NewGiftPage/>
    
    </View>
  )
}

const styles=StyleSheet.create({
  root:{
    flex:1,
    backgroundColor: '#F9FBFC'

  }
})