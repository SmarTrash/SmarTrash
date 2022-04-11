import { View, Text, StyleSheet , Dimensions } from 'react-native'
import React from 'react'
import {MaterialIcons } from '@expo/vector-icons';
import COLORS from '../../Consts/colors';
const { width } = Dimensions.get('screen');
const cardWidth = width / 1.06;

const CompetitionCard = () => {
  return (
       
   <View style={[style.topHotelCard, style.shadowProp]}>
      <View
        style={{
          position: 'absolute',
          top: 5,
          right: 5,
          zIndex: 1,
          flexDirection: 'row',
        }}>
      <MaterialIcons name="stars" size={22} color={COLORS.gold} style={style.pointIcon} />
      </View>
      <View style={{ paddingVertical: 5, paddingHorizontal: 10 }}>
        <Text style={{ fontSize: 10, fontWeight: 'bold' }}>נוי אהרון</Text>
        <Text style={{ fontSize: 7, fontWeight: 'bold', color: COLORS.grey }}>
     8000
        </Text>
      </View>
      <View style={[style.topHotelCard, style.shadowProp]}>
      <View
        style={{
          position: 'absolute',
          top: 5,
          right: 5,
          zIndex: 1,
          flexDirection: 'row',
        }}>
      <MaterialIcons name="stars" size={22} color={COLORS.gold} style={style.pointIcon} />
      </View>
      <View style={{ paddingVertical: 5, paddingHorizontal: 10 }}>
        <Text style={{ fontSize: 10, fontWeight: 'bold' }}>מורן גיבלי</Text>
        <Text style={{ fontSize: 7, fontWeight: 'bold', color: COLORS.grey }}>
     3
        </Text>
      </View>
      </View>
      </View>
  )
}

export default CompetitionCard
const style = StyleSheet.create({
  topHotelCard: {
    height: 50,
    width: cardWidth,
    backgroundColor: COLORS.offwhite,
    marginTop: 70,
    margin:10,
    borderRadius: 10,
    elevation: 15,
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    alignItems: 'flex-start',
    

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