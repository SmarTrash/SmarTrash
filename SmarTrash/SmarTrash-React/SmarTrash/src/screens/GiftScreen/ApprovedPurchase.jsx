import { View, Text, StyleSheet, Image, Dimensions } from 'react-native'
import COLORS from '../../Consts/colors'
import CustonButton from '../../Components/CustomButton/CustonButton';
import CoinIcon from '../../Components/Icon/CoinIcon';
import { GlobalContext } from '../../../GlobalContext/GlobalContext'
import React,{ useState,useEffect,useContext } from 'react'

const { width } = Dimensions.get('screen');

const ApprovedPurchase=({ navigation})=> {
const { userPoints } = useContext(GlobalContext);
  console.log(userPoints)
  return (
    <View style={styles.container}>

      <View style={styles.txtContainer}>
        <Text style={styles.txt} >ההטבה בדרך אליך !</Text>
      </View>

      <View style={styles.imgContainer}>
        <Image
          style={styles.image}
          source={{ uri: 'https://cdn5.vectorstock.com/i/1000x1000/31/19/green-delivery-logo-icon-design-vector-22483119.jpg' }} />
      </View>


      <View style={{ width }}>
        <View>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: COLORS.dark, textAlign: 'center',  }}>
            {'סה"כ נקודות שנשארו לך:'}
          </Text>
        </View>

        <View  >
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: COLORS.dark, textAlign: 'center',margin:10,padding:20 }}>
           {userPoints} {' '}
            <CoinIcon />
          </Text>
        </View>
      </View>

      <View style={{marginTop:50}}>
        <CustonButton   
        text="סיים"
        onPress={()=> navigation.navigate('Home')} 
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
    marginLeft:70

  },

  image: {
    flex: 1,
    width: undefined,
    height: undefined,
    marginTop: 90,
    marginLeft:10


  },
  imgContainer: {
    width: 400,
    height: 300,
    borderRadius: 100,
    overflow: 'hidden',

  },
  txtPoints: {
    fontSize: 20,
    margin: 10,
    textAlign: 'right',
  },
  starIcon:{
    marginTop:10,
  },

})