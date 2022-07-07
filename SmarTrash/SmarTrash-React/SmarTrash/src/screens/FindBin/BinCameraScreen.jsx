import { View, Dimensions, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import Camera from '../../Components/Camera/BinCamera'
import Loader from '../../Components/Loader/Loader';


const { width } = Dimensions.get('screen');
const { height } = Dimensions.get('screen');
const cardWidth = width;
const cardHeight = height;

const BinCameraScreen = () => {

  const [loading, setLoading] = useState(false);

  return (
    <View>
      <Loader visible={loading} />
      <View style={styles.root}>
        <Camera />
      </View>
    </View>
  )
}

export default BinCameraScreen

const styles = StyleSheet.create({
  header: {
    marginTop: 60,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    justifyContent: 'space-between',
  },
  root: {
    alignItems: 'center',
    backgroundColor: 'white',
    width: cardWidth,
    height: cardHeight,
  },
})