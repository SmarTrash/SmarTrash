import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import Navigation from './src/Components/Navigation';
import {Provider} from './GlobalContext/GlobalContext';


export default function App() {
  return (
    <Provider>
    <View style={styles.root} >
      <Navigation/>
    </View>
    </Provider>
  )
}

const styles=StyleSheet.create({
  root:{
    flex:1,
    backgroundColor: '#F9FBFC'

  }
})