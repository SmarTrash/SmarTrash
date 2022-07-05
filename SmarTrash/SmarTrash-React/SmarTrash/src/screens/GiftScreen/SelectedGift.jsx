import React from 'react';
import { Image,  StyleSheet, Text, View, Dimensions } from 'react-native';
import COLORS from '../../Consts/colors'
import { useEffect, useContext, useState } from 'react';
import { GlobalContext } from '../../../GlobalContext/GlobalContext'
import CoinIcon from '../../Components/Icon/CoinIcon';
import CustonButton from '../../Components/CustomButton/CustonButton'


const apiUrl = 'http://proj.ruppin.ac.il/bgroup91/prod/api/Gift/AbleToOrder/';
const { width } = Dimensions.get('screen');
const cardWidth = width ;
const imgWidth = width/ 1.07;

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
    <View style={style.container}>

      <View style={style.imgContainer}>
        <Image style={style.headerImage} source={{ uri: item.Image }} />
      </View>

      <View style={style.content}>
        <Text style={style.txtContent2}>
          {item.Brand}
        </Text>
        <Text style={style.txtContent}>
          {item.GiftName + '\n\n' + item.GiftDescription}
        </Text>

        <Text style={style.priceContent}>
          {item.Price} <CoinIcon />
        </Text>
      </View>

      <CustonButton
        text='רכישה'
        disabled={!isAbleToOrder}
        onPress={() => { navigation.navigate('GiftPurchase', item.GiftId) }}
      />
    </View>

  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  imgContainer: {
    height: 400,
    width: cardWidth,
    backgroundColor: COLORS.white,
    elevation: 15,
    borderRadius:20,
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    alignContent:'center',
  },
  headerImage: {
    height: 400,
    width:'100%',
    borderRadius:20,
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    alignContent:'center',
  },
  content: {
    marginTop: 10,
    flexDirection: 'column',
  },
  txtContent: {
    lineHeight: 24,
    color: COLORS.grey,
    fontSize: 24,
    padding: 10
  },
  txtContent2: {
    textAlign: 'left',
    fontWeight: 'bold',
    color: COLORS.grey,
    fontSize: 24,
    padding: 10
  },
  priceContent: {
    textAlign: 'left',
    lineHeight: 20,
    color: COLORS.green,
    fontSize: 24,
    fontWeight: 'bold',
    padding: 20
  },


});

export default SelectedGift