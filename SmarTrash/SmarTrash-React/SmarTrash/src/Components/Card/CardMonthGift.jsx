import { Dimensions, TouchableOpacity, StyleSheet, Text, View, Image } from 'react-native';
import React, { useState, useEffect } from 'react'
import COLORS from '../../Consts/colors';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('screen');
const cardWidth = width / 1.05;
const apiUrl = 'http://proj.ruppin.ac.il/bgroup91/prod/api/Competition/GetCompGift';

const CardMonthGift = () => {
  const [giftData, setGiftData] = useState('');

  const navigation = useNavigation();

  useEffect(() => {
    onLoud();
  },[]);
  
  const onLoud = () => {
    fetch(apiUrl, {
      method: 'GET',
      body: JSON.stringify(),
      headers: new Headers({
        'Content-type': 'application/json; charset=UTF-8',
        'Accept': 'application/json; charset-UTF-8'

      })
    }).then(response => { return response.json() })
      .then(data => {
        setGiftData(data);

      });
  }

  return (
    <TouchableOpacity onPress={() => navigation.navigate('CompetitionList')}>
      <View style={style.Card}>
        <View
          style={{
            position: 'absolute',
            top: 5,
            right: 5,
            zIndex: 1,
            flexDirection: 'row',
          }}>
        </View>
        <Image style={style.CardImage} source={{ uri: giftData["GiftImage"] }} />
        <View style={{ paddingVertical: 3, paddingHorizontal: 10 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: COLORS.primary, alignSelf: 'flex-start' }}>
            {'הטבה חודשית'}
          </Text>
          <Text style={{ fontSize: 15, fontWeight: 'bold', alignSelf: 'flex-start' }}>{giftData["GiftDescription"]}</Text>
          <Text style={{ fontSize: 12, fontWeight: 'bold', color: COLORS.grey, alignSelf: 'flex-end' }}>
            {giftData["Brand"]}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({

  Card: {
    height: 345,
    width: cardWidth,
    backgroundColor: COLORS.white,
    elevation: 15,
    marginHorizontal: 10,
    borderRadius: 10,
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 5,

  },
  CardImage: {
    height: 250,
    width: cardWidth,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  }
});
export default CardMonthGift