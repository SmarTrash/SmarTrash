import { View, Dimensions, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import Camera from '../../Components/Camera/BinCamera'



const { width } = Dimensions.get('screen');
const { height } = Dimensions.get('screen');
const cardWidth = width;
const cardHeight = height;

const BinCameraScreen = () => {

  return (
   
        <View style={styles.root}>
        <Camera />
      </View>
    
  )
}

export default BinCameraScreen

const styles = StyleSheet.create({

  root: {
  
       alignItems: 'center',
    backgroundColor: 'white',
     width: cardWidth,
    height: cardHeight,
  },
})