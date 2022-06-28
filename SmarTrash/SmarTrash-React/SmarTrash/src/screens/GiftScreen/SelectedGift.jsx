import React from 'react';
import { ImageBackground, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import COLORS from '../../Consts/colors'
import { useEffect, useContext, useState } from 'react';
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

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        backgroundColor: COLORS.white,
        paddingBottom: 20,
        flex:1,
      }}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="rgba(0,0,0,0)"
      />
      <ImageBackground style={style.headerImage} source={{ uri: item.Image }}>
        <View style={style.header}>
        </View>
      </ImageBackground>
      <View>
        <View style={{ marginTop: 80, paddingHorizontal: 20 }}>
          <Text style={{ fontSize: 30, fontWeight: 'bold', alignSelf: 'flex-start' }}>{item.Name}</Text>
          <Text
            style={{
              fontSize: 26,
              fontWeight: '400',
              marginTop: 15,
              alignSelf: 'flex-start',
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
          <View style={style.priceTag}>
          <CoinIcon />
          <Text
            style={{ fontSize: 20, fontWeight: 'bold', left: 20, color: COLORS.green }}>
            {item.Price}
          </Text>
        </View>
          <View style={{ marginBottom:20, fontSize: 30 }}>
            <Text style={{ lineHeight: 20, color: COLORS.grey, alignSelf: 'flex-start',fontSize: 18  }}>
              {item.GiftDescription}
            </Text>
          </View>
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
    marginTop: 20,
    height: 40,
    alignItems: 'center',
    flex: 1,
    bottom: 15,
    width: 150,
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
    height: 400,
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