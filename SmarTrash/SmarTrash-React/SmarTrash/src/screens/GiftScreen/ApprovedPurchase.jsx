import { View, Text, StyleSheet, Dimensions } from 'react-native'
import COLORS from '../../Consts/colors'
import CustonButton from '../../Components/CustomButton/CustonButton';
import React from 'react'
import LottieView from 'lottie-react-native';

const { width } = Dimensions.get('screen');

const ApprovedPurchase = ({ navigation }) => {

  return (
    <View style={styles.container}>
      <View style={styles.txtContainer}>
        <Text style={styles.brandViewText}>ההטבה בדרך אליך !</Text>
      </View>
      <View style={styles.imgContainer}>
        <LottieView style={{ width: 20, aspectRatio: 300 / 300, flexGrow: 1, alignSelf: 'center' }}
          resizeMode="cover"
          source={require('../../../assets/delivery.json')}
          autoPlay
        />
      </View>
      <View style={{ marginTop: 20 }}>
        <CustonButton
          text="סיים"
          onPress={() => navigation.navigate('Home')}
        />
      </View>
    </View>
  )}
export default ApprovedPurchase
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    flexDirection: 'column',
    alignSelf: 'center',
  },
  txtContainer: {
    marginTop: 150,
    marginLeft: 70
  },
  brandViewText: {
    fontSize: 35,
    fontWeight: 'bold',
    color: 'black',
    textTransform: 'uppercase'
  },
  imgContainer: {
    width: 400,
    height: 300,
    borderRadius: 100,
    overflow: 'hidden',
    margin:30
  },
})