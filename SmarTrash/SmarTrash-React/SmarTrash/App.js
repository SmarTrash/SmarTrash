import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import Navigation from './src/Components/Navigation';



export default function App() {
  return (
    
    <View style={styles.root} >
      <Navigation/>
    </View>
  )
}

const styles=StyleSheet.create({
  root:{
    flex:1,
    backgroundColor: '#F9FBFC'

  }
})