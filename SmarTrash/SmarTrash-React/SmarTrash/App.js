import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import SignInScreen from './src/screens/SignInScreen'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUpScreen from './src/screens/SignUpScreen'

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    
    <View style={styles.root} >
      <SignUpScreen/>
    
    </View>
  )
}

const styles=StyleSheet.create({
  root:{
    flex:1,
    backgroundColor: '#F9FBFC'

  }
})