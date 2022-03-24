import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import MapScreen from './src/screens/MapScreen/Map';
import Home2 from './src/screens/HomeScreen/Home2';
import GiftsPage from './src/screens/GiftScreen/GiftsPage';
import SelectedGift from './src/screens/GiftScreen/SelectedGift';

export default function App() {
  return (
    
    <View style={styles.root} >
      <MapScreen />
      <SelectedGift />
    </View>
  )
}

const styles=StyleSheet.create({
  root:{
    flex:1,
    backgroundColor: '#F9FBFC'

  }
})