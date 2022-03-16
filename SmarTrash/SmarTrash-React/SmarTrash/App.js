import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import SignInScreen from './src/screens/SignInScreen'
export default function App() {
  return (
    <View style={styles.root} >
      <SignInScreen/>
    </View>
  )
}

const styles=StyleSheet.create({
  root:{
    flex:1,
    backgroundColor: '#F9FBFC'

  }
})