import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
//import Navigation from './src/Components/Navigation';
<<<<<<< Updated upstream
//import Home2 from './src/screens/HomeScreen/Home2';
import MapScreen from './src/screens/MapScreen/Map';
=======
import Home2 from './src/screens/HomeScreen/Home2';
import GiftsPage from './src/screens/GiftScreen/GiftsPage';
import SelectedGift from './src/screens/GiftScreen/SelectedGift';
import Navigation from './src/Components/Navigation';
>>>>>>> Stashed changes

export default function App() {
  return (
    
    <View style={styles.root} >
<<<<<<< Updated upstream
      <MapScreen />
=======
      <SelectedGift />
>>>>>>> Stashed changes
    </View>
  )
}

const styles=StyleSheet.create({
  root:{
    flex:1,
    backgroundColor: '#F9FBFC'

  }
})