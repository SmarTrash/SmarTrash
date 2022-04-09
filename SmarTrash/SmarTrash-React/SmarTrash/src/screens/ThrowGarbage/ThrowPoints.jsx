
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import COLORS from '../../Consts/colors';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import CustonButton from '../../Components/CustomButton/CustonButton';


const { width } = Dimensions.get('screen');
const cardWidth = width / 1.06;

export default function ReceptBin() {
  return (
    <View style={{backgroundColor:COLORS.white}}>
      <View style={{ alignSelf: 'center' }}>
        <View style={style.profileImage}>
          <Image
            style={style.image}
            source={{ uri: 'https://www.thehandbook.com/cdn-cgi/image/width=300,height=300,fit=cover,q=85/https://files.thehandbook.com/uploads/2019/12/22708923_288175598347572_5346731196820750336_n.jpg' }} />
        </View>
      </View>

      <View style={style.topHotelCard}>
        <View
          style={{
            position: 'absolute',
            top: 5,
            right: 5,
            zIndex: 1,
            flexDirection: 'row',
          }}>
          <View style={{ alignItems: 'center' }} top={70}>
            <Ionicons name="md-checkmark-circle" size={60} color={COLORS.green} />

          </View>
        </View>
        <View style={{ paddingVertical: 3, paddingHorizontal: 10 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: COLORS.green, alignSelf: 'center', margin: 10, textAlign: 'center' }}>
            {'העולם מוסר לך תודה מאיה!'}
          </Text>
        </View>
      </View>

      <View style={style.topHotelCard}>
        <View
          style={{
            position: 'absolute',
            top: 5,
            right: 5,
            zIndex: 1,
            flexDirection: 'row',
          }}>
          <View style={{ alignItems: 'center' }} top={70}>
            <Ionicons name="md-checkmark-circle" size={60} color={COLORS.green} />

          </View>
        </View>
        <View style={{ paddingVertical: 3, paddingHorizontal: 10 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: COLORS.green, alignSelf: 'center', margin: 10, textAlign: 'center' }}>
            {'העולם מוסר לך תודה מאיה!'}
          </Text>
        </View>
      </View>



      <View>
        <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
          <MaterialIcons name="stars" size={24} color={COLORS.gold} margin={30} />
          <MaterialIcons name="stars" size={24} color={COLORS.gold} />
          <MaterialIcons name="stars" size={24} color={COLORS.gold} />
        </View>
      </View>


      <View style={{ marginTop: 300 }}>
        <CustonButton
          text="לחץ כאן לאחר הזריקה"
          onPress={() => navigation.navigate('ThrowPoints')}
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
    marginHorizontal: 10,
    borderRadius: 10,
    top: 80,
    elevation: 15,
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,

  },
  // AddNewAddress: {
  //   height: 70,
  //   width: cardWidth,
  //   backgroundColor: COLORS.white,
  //   elevation: 15,
  //   marginHorizontal: 10,
  //   borderRadius: 10,
  //   top: 80,
  //   right: 10,
  // },
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


});
