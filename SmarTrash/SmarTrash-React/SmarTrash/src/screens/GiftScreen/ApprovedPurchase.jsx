import { View, Text, StyleSheet, Image, Dimensions } from 'react-native'
import COLORS from '../../Consts/colors'
import CustonButton from '../../Components/CustomButton/CustonButton';
import CoinIcon from '../../Components/Icon/CoinIcon';
import { GlobalContext } from '../../../GlobalContext/GlobalContext'
import React, { useState, useEffect, useContext } from 'react'
import LottieView from 'lottie-react-native';
const { width } = Dimensions.get('screen');

const ApprovedPurchase = ({ navigation }) => {
  const { userPoints } = useContext(GlobalContext);
  console.log(userPoints)
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

{/* 
      <View style={{ width }}>
        <View>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: COLORS.dark, textAlign: 'center', }}>
            {'סה"כ נקודות שנשארו לך:'}
          </Text>
        </View> */}

        {/* <View  >
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: COLORS.dark, textAlign: 'center', margin: 10, padding: 20 }}>
            {userPoints} {' '}
            <CoinIcon />
          </Text>
        </View>
      </View> */}

      <View style={{ marginTop: 20 }}>
        <CustonButton
          text="סיים"
          onPress={() => navigation.navigate('Home')}
        />
      </View>

    </View>

  )
}
export default ApprovedPurchase
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    flexDirection: 'column',
    // alignItems: 'center',
    alignSelf: 'center',
  },
  txt: {
    // fontFamily: 'HelveticaNeue',
    color: COLORS.dark,
    fontSize: 30,
    fontWeight: 'bold',
  },
  txtContainer: {
    marginTop: 150,
    marginLeft: 70

  },

  image: {
    flex: 1,
    width: undefined,
    height: undefined,
    marginTop: 90,
    marginLeft: 10


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
  txtPoints: {
    fontSize: 20,
    margin: 10,
    textAlign: 'right',
  },
  starIcon: {
    marginTop: 10,
  },

})