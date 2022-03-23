import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
//import Navigation from './src/Components/Navigation';
//import Home2 from './src/screens/HomeScreen/Home2';
import MapScreen from './src/screens/MapScreen/Map';

export default function App() {
  return (
    
    <View style={styles.root} >
      <MapScreen />
    </View>
  )
}

const styles=StyleSheet.create({
  root:{
    flex:1,
    backgroundColor: '#F9FBFC'

  }
})