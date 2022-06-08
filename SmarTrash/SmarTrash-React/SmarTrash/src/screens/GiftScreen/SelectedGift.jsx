import React from 'react';
import { ImageBackground, ScrollView, StatusBar, StyleSheet, Text, View, Button } from 'react-native';
import COLORS from '../../Consts/colors'
import { useEffect, useContext, useState } from 'react';
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';
import { GlobalContext } from '../../../GlobalContext/GlobalContext'
import CoinIcon from '../../Components/Icon/CoinIcon';
import CustonButton from '../../Components/CustomButton/CustonButton'

const apiUrl = 'http://proj.ruppin.ac.il/bgroup91/prod/api/Gift/AbleToOrder/';

const SelectedGift = ({ navigation, route }) => {

  const [isAbleToOrder, setIsAbleToOrder] = useState(false);
  const { userEmail } = useContext(GlobalContext);
  const item = route.params;
  console.log("item=" + item.GiftId)

  useEffect(() => {
    fetch(apiUrl + item.GiftId, {
      method: 'POST',
      body: JSON.stringify({ UserEmail: userEmail }),
      headers: new Headers({
        'Content-type': 'application/json; charset=UTF-8',
        'Accept': 'application/json; charset-UTF-8'
      })
    }).then(response => { return response.json() })
      .then(data => {
        setIsAbleToOrder(data)
        console.log("setisAbleToOrder=" + data)
      });
  }, []);


  console.log("setisAbleToOrder=" + isAbleToOrder)
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        backgroundColor: COLORS.white,
        paddingBottom: 20,
      }}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="rgba(0,0,0,0)"
      />
      <ImageBackground style={style.headerImage} source={{ uri: item.Image }}>
        <View style={style.header}>

          <AntDesign
            name="left"
            size={28}
            color={COLORS.white}
            onPress={navigation.goBack}
          />
        </View>
      </ImageBackground>
      <View>
        <View style={style.iconContainer}>
          <AntDesign name="hearto" size={24} color={COLORS.white} />
        </View>
        <View style={{ marginTop: 20, paddingHorizontal: 20 }}>
          <Text style={{ fontSize: 30, fontWeight: 'bold', alignSelf: 'flex-end' }}>{item.Name}</Text>
          <Text
            style={{
              fontSize: 20,
              fontWeight: '400',
              marginTop: 10,
              alignSelf: 'flex-end',
              color: COLORS.primary,
            }}>
            {item.Brand}
          </Text>
          <View
            style={{
              marginTop: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
          </View>
          <View style={{ marginTop: 20, fontSize: 30 }}>
            <Text style={{ lineHeight: 20, color: COLORS.grey, alignSelf: 'flex-end' }}>
              {item.GiftDescription}
            </Text>
          </View>
        </View>

        <View style={style.priceTag}>
          <CoinIcon />
          <Text
            style={{ fontSize: 16, fontWeight: 'bold', marginLeft: 5, left: 20, color: 'white' }}>
            {item.Price}

          </Text>
        </View>

        <CustonButton
            text='רכישה'
            disabled={!isAbleToOrder}
            onPress={() => {navigation.navigate('GiftPurchase', item.GiftId)}}
          />
  


      </View>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  container: {
    width: '100%',
    padding: 15,
    marginVertical: 10,
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: COLORS.primary,
  },
  btn: {
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    backgroundColor: COLORS.primary,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  amount: {
    left: 250,
    top: 30,

  },
  priceTag: {
    marginTop: 50,
    height: 40,
    alignItems: 'center',
    marginLeft: 50,
    paddingLeft: 20,
    flex: 1,
    bottom: 15,
    width: 150,
    backgroundColor: '#76bfa3',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
    flexDirection: 'row',
  },
  iconContainer: {
    position: 'absolute',
    height: 60,
    width: 60,
    backgroundColor: COLORS.primary,
    top: -30,
    left: 20,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerImage: {
    height: 500,
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
    overflow: 'hidden',
  },
  header: {
    marginTop: 60,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    justifyContent: 'space-between',
  },

});

export default SelectedGift