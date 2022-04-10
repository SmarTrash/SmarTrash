
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import COLORS from '../../Consts/colors';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import CustonButton from '../../Components/CustomButton/CustonButton';


const { width } = Dimensions.get('screen');
const cardWidth = width / 1.06;

export default function ThrowPoints({ navigation }) {
  return (
    <View style={{ backgroundColor: COLORS.white, width}}>
      <View style={{ alignSelf: 'center' }}>
        <View style={style.profileImage}>
          <Image
            style={style.image}
            source={{ uri: 'https://www.thehandbook.com/cdn-cgi/image/width=300,height=300,fit=cover,q=85/https://files.thehandbook.com/uploads/2019/12/22708923_288175598347572_5346731196820750336_n.jpg' }} />
        </View>
      </View>

      <View style={style.topHotelCard}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: COLORS.green, alignSelf: 'center', margin: 10, textAlign: 'center' }}>
          {'העולם מוסר לך תודה !'}
        </Text>
        <View style={style.imageEarthContainer}>
          <Image
            style={style.imageEarth}
            source={{ uri: 'https://m.media-amazon.com/images/I/51udbTwCXvL._SL1000_.jpg' }} />
        </View>
      </View>

      <View style={style.topHotelCard}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: COLORS.green, alignSelf: 'center', margin: 10, textAlign: 'center' }}>
          {'במיחזור זה:'}
        </Text>
        <View style={style.txtContainer}>
          <Ionicons name="md-checkmark-circle" size={28} color={COLORS.green} style={style.ChkdIcon} />
          <Text style={style.text}>
            {'מיחזרת 1.32 קילו פסולת'}
          </Text>
        </View>
        <View style={style.txtContainer}>
          <Ionicons name="md-checkmark-circle" size={28} color={COLORS.green} style={style.ChkdIcon} />
          <Text style={style.text}>
            {'צברת 132 נקודות'}
          </Text>
        </View>
      </View>

      <View style={style.pointsTxt}>
        <Text style={style.txtPoints}>
          {'סה"כ הנקודות שלך: '}
        </Text>
          <Text style={[style.txtPoints, {marginRight:150}]}>
            {'3200'}
          </Text>
          <MaterialIcons name="stars" size={22} color={COLORS.gold} style={style.pointIcon} />
      </View>

      <View style={{marginTop:50}}>
        <CustonButton
          text="חזרה לדף הבית "
          onPress={() => navigation.navigate('Home')}
        />
      </View>

    </View>
  )
}
const style = StyleSheet.create({
  profileImage: {
    width: 80,
    height: 80,
    top: 60,
    alignSelf: 'flex-end',
    borderRadius: 100,
    overflow: 'hidden',
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
  topHotelCard: {
    height: 180,
    width: cardWidth,
    backgroundColor: COLORS.white,
    elevation: 15,
    margin: 15,
    borderRadius: 10,
    top: 80,
    elevation: 15,
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,

  },
  imageEarthContainer: {
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    width: 75,
    height: 75,
    marginTop: 20
  },
  imageEarth: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
  txtContainer: {
    textAlign: 'right',
    flexDirection: 'row-reverse',
  },
  topHotelCardImage: {
    height: 250,
    width: cardWidth,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  priceTag: {
    height: 40,
    alignItems: 'center',
    marginLeft: 50,
    paddingLeft: 20,
    bottom: 65,
    width: 150,
    left: 250,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
    flexDirection: 'row',
  },
  text: {
    fontFamily: 'HelveticaNeue',
    color: '#52575D',
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
    margin: 10,
    textAlign: 'center'
  },
  ChkdIcon: {
    marginTop: 6
  },
  pointsTxt: {
    marginTop: 150,
    margin:15,
    flexDirection: 'row-reverse',
    justifyContent:'flex-start',
  },
  txtPoints:{
    fontFamily: 'HelveticaNeue',
    color: '#52575D',
    fontSize: 16,
    fontWeight: 'bold',
    margin: 10,
  },
  pointIcon:{
    marginTop:8,
  },

});

