import { View, Dimensions, StyleSheet } from 'react-native'
import React, { useContext } from 'react'
import BinCamera from '../../Components/Camera/BinCamera'


const { width } = Dimensions.get('screen');
const { height } = Dimensions.get('screen');
const cardWidth = width;
const cardHeight = height;

const BinCameraScreen = () => {
  return (
    <View  style={styles.root}>
      <BinCamera />
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