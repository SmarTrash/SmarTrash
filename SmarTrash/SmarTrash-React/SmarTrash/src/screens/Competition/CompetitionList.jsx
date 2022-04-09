
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import COLORS from '../../Consts/colors';
import {MaterialIcons } from '@expo/vector-icons';
import {  ScrollView } from 'react-native-gesture-handler';



const { width } = Dimensions.get('screen');
const cardWidth = width / 1.06;

export default function CompetitionList({ navigation }) {
  return (
    <View style={{ backgroundColor: COLORS.white, flex: 1 }}>

      <View style={style.titleContainer}>
        <View style={style.profileImage}>
          <Image
            style={style.image}
            source={{ uri: 'https://www.thehandbook.com/cdn-cgi/image/width=300,height=300,fit=cover,q=85/https://files.thehandbook.com/uploads/2019/12/22708923_288175598347572_5346731196820750336_n.jpg' }} />
        </View>
        <View style={style.txtTitleContainer}>
          <Text style={style.txtTitle}>{'המתחרים בעיר שלך'}</Text>
        </View>
      </View>

      <ScrollView style={{flex:1, paddingVertical: 20}}>

        <View style={style.topHotelCard}>
          <Text style={style.txtCard}>
            {'אביב אלוש'}
          </Text>
          <Text style={[style.txtCard, { marginRight: 210 }]}>
            {'32000'}
          </Text>
          <MaterialIcons name="stars" size={22} color={COLORS.gold} style={style.pointIcon} />
        </View>

        <View style={style.topHotelCard}>
          <Text style={style.txtCard}>
            {'ניב סולטן'}
          </Text>
          <Text style={[style.txtCard, { marginRight: 220 }]}>
            {'30000'}
          </Text>
          <MaterialIcons name="stars" size={22} color={COLORS.gold} style={style.pointIcon} />
        </View>

        <View style={style.topHotelCard}>
          <Text style={style.txtCard}>
            {'יהונתן מרגי'}
          </Text>
          <Text style={[style.txtCard, { marginRight: 210 }]}>
            {'29000'}
          </Text>
          <MaterialIcons name="stars" size={22} color={COLORS.gold} style={style.pointIcon} />
        </View>

        <View style={style.topHotelCard}>
          <Text style={style.txtCard}>
            {'אביב אלוש'}
          </Text>
          <Text style={[style.txtCard, { marginRight: 210 }]}>
            {'32000'}
          </Text>
          <MaterialIcons name="stars" size={22} color={COLORS.gold} style={style.pointIcon} />
        </View>

        <View style={style.topHotelCard}>
          <Text style={style.txtCard}>
            {'ניב סולטן'}
          </Text>
          <Text style={[style.txtCard, { marginRight: 220 }]}>
            {'30000'}
          </Text>
          <MaterialIcons name="stars" size={22} color={COLORS.gold} style={style.pointIcon} />
        </View>

        <View style={style.topHotelCard}>
          <Text style={style.txtCard}>
            {'יהונתן מרגי'}
          </Text>
          <Text style={[style.txtCard, { marginRight: 210 }]}>
            {'29000'}
          </Text>
          <MaterialIcons name="stars" size={22} color={COLORS.gold} style={style.pointIcon} />
        </View>

        <View style={style.topHotelCard}>
          <Text style={style.txtCard}>
            {'אביב אלוש'}
          </Text>
          <Text style={[style.txtCard, { marginRight: 210 }]}>
            {'32000'}
          </Text>
          <MaterialIcons name="stars" size={22} color={COLORS.gold} style={style.pointIcon} />
        </View>

        <View style={style.topHotelCard}>
          <Text style={style.txtCard}>
            {'ניב סולטן'}
          </Text>
          <Text style={[style.txtCard, { marginRight: 220 }]}>
            {'30000'}
          </Text>
          <MaterialIcons name="stars" size={22} color={COLORS.gold} style={style.pointIcon} />
        </View>

        <View style={style.topHotelCard}>
          <Text style={style.txtCard}>
            {'יהונתן מרגי'}
          </Text>
          <Text style={[style.txtCard, { marginRight: 210 }]}>
            {'29000'}
          </Text>
          <MaterialIcons name="stars" size={22} color={COLORS.gold} style={style.pointIcon} />
        </View>

        <View style={style.topHotelCard}>
          <Text style={style.txtCard}>
            {'אביב אלוש'}
          </Text>
          <Text style={[style.txtCard, { marginRight: 210 }]}>
            {'32000'}
          </Text>
          <MaterialIcons name="stars" size={22} color={COLORS.gold} style={style.pointIcon} />
        </View>

        <View style={style.topHotelCard}>
          <Text style={style.txtCard}>
            {'ניב סולטן'}
          </Text>
          <Text style={[style.txtCard, { marginRight: 220 }]}>
            {'30000'}
          </Text>
          <MaterialIcons name="stars" size={22} color={COLORS.gold} style={style.pointIcon} />
        </View>

        <View style={style.topHotelCard}>
          <Text style={style.txtCard}>
            {'יהונתן מרגי'}
          </Text>
          <Text style={[style.txtCard, { marginRight: 210 }]}>
            {'29000'}
          </Text>
          <MaterialIcons name="stars" size={22} color={COLORS.gold} style={style.pointIcon} />
        </View>

        <View style={style.topHotelCard}>
          <Text style={style.txtCard}>
            {'אביב אלוש'}
          </Text>
          <Text style={[style.txtCard, { marginRight: 210 }]}>
            {'32000'}
          </Text>
          <MaterialIcons name="stars" size={22} color={COLORS.gold} style={style.pointIcon} />
        </View>

        <View style={style.topHotelCard}>
          <Text style={style.txtCard}>
            {'ניב סולטן'}
          </Text>
          <Text style={[style.txtCard, { marginRight: 220 }]}>
            {'30000'}
          </Text>
          <MaterialIcons name="stars" size={22} color={COLORS.gold} style={style.pointIcon} />
        </View>

        <View style={style.topHotelCard}>
          <Text style={style.txtCard}>
            {'יהונתן מרגי'}
          </Text>
          <Text style={[style.txtCard, { marginRight: 210 }]}>
            {'29000'}
          </Text>
          <MaterialIcons name="stars" size={22} color={COLORS.gold} style={style.pointIcon} />
        </View>

      </ScrollView>

    </View>
  )
}
const style = StyleSheet.create({
  topHotelCard: {
    height: 50,
    width: cardWidth,
    backgroundColor: COLORS.offwhite,
    elevation: 15,
    margin: 10,
    borderRadius: 10,
    top: 55,
    elevation: 15,
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  txtTitle: {
    fontFamily: 'HelveticaNeue',
    color: '#52575D',
    fontSize: 24,
    fontWeight: 'bold',
    top: 50,
    textAlign: 'center',
  },
  profileImage: {
    width: 60,
    height: 60,
    top: 60,
    borderRadius: 100,
    overflow: 'hidden',
    marginRight: 15,
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
  titleContainer: {
    flexDirection: 'row-reverse',
    marginBottom: 20,
  },
  txtTitleContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignContent: 'flex-end',
  },
  txtCard: {
    fontFamily: 'HelveticaNeue',
    color: '#52575D',
    fontSize: 16,
    fontWeight: 'bold',
    margin: 10,
  },
  pointIcon: {
    marginTop: 8,
  },


});

