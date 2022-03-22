import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
//import Navigation from './src/Components/Navigation';
import Home2 from './src/screens/HomeScreen/Home2';

export default function App() {
  return (
    
    <View style={styles.root} >
      <Home2 />
    </View>
  )
}

const styles=StyleSheet.create({
  root:{
    flex:1,
    backgroundColor: '#F9FBFC'

  }
})