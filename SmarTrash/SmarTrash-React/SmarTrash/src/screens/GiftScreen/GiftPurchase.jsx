import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, Button } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import COLORS from '../../Consts/colors';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { GlobalContext } from '../../../GlobalContext/GlobalContext'
import CoinIcon from '../../Components/Icon/CoinIcon';
import CustonButton from '../../Components/CustomButton/CustonButton'

const apiUrl = 'http://proj.ruppin.ac.il/bgroup91/prod/api/Gift/ShippingDetails/';
const { width } = Dimensions.get('screen');
const cardWidth = width / 1.06;

const GiftPurchase = ({ navigation, route }) => {

  const { userEmail, userImg } = useContext(GlobalContext);
  const [userShippingDetails, setUserShippingDetails] = useState({});
  const [pointsLeft, setPointsLeft] = useState();
  const giftId = route.params;

  useEffect(() => {
    ShippingDetails();
  }, []);
  const AddNewAdress = () => {
  }
  const ShippingDetails = () => {
    fetch(apiUrl + giftId, {
      method: 'POST',
      body: JSON.stringify({ UserEmail: userEmail }),
      headers: new Headers({
        'Content-type': 'application/json; charset=UTF-8',
        'Accept': 'application/json; charset-UTF-8'
      })
    }).then(response => { return response.json() })
      .then(data => {
        data.map(st => setUserShippingDetails(st))
        setPointsLeft(userShippingDetails.points - userShippingDetails.price)

      });
  }

  return (
    <View style={style.container}>

      <View style={{ alignSelf: 'center', alignItems: 'center', flexDirection: 'column' }}>
        <View style={style.profileImage}>
          <Image
            style={style.image}
            source={{ uri: userImg }} />
        </View>
        <Text style={{ fontSize: 25, fontWeight: 'bold', color: COLORS.primary, top: 60, margin: 5 }}>
          כתובת
        </Text>
      </View>

      <View style={style.AdressCard}>

        <View style={style.AdressCardContent}>
          <Ionicons style={style.icon} name="md-checkmark-circle" size={60} color={COLORS.primary} />
          <View style={style.txtcontainer}>
            <Text style={style.txtTitle}>
              {'כתובת ברירת מחדל'}
            </Text>
            <Text style={[style.txt, { fontSize: 18, color: COLORS.dark }]}>{userShippingDetails.StreetNameAndNumber}</Text>
            <Text style={style.txt}>
              {userShippingDetails.city}
            </Text>
            <Text style={style.txt}>
              {userShippingDetails.Phone}
            </Text>
          </View>
        </View>

      </View>

      {/* הוספת כתובת */}

      <View style={style.AddNewAddress}>
        <View style={style.AddNewAddressContent}>
          <Text style={style.txtTitleAddAddress}>
            הוסף כתובת
          </Text>
          <MaterialCommunityIcons style={style.iconAddAdress} name="plus-circle" size={50} color={COLORS.primary} />
          {/* <TouchableOpacity onPress={AddNewAdress}> */}
          {/* </TouchableOpacity> */}
        </View>

      </View>
      {/* סה"כ נקודות - טקסט*/}
      <View style={{ top: 20 }}>
        <View>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: COLORS.primary, alignSelf: 'flex-start', margin: 20 }}>
            {'סה"כ נקודות'}
          </Text>
        </View>
        {/* {'סה"כ נקודות'} */}
        <View>
          <Text style={[style.priceTag, { fontSize: 20, fontWeight: 'bold', color: COLORS.primary, alignSelf: 'flex-start', margin: 20 }]}>
            {userShippingDetails.points} <CoinIcon />
          </Text>
        </View>
      </View>

      {/* מחיר הטבה - טקסט*/}
      <View style={{ bottom: 95 }}>
        <View>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: COLORS.primary, alignSelf: 'flex-start', margin: 20 }}>
            {'מחיר הטבה'}
          </Text>
        </View>
        {/* {'מחיר הטבה'} */}
        <View>
          <Text style={[style.priceTag, { fontSize: 20, fontWeight: 'bold', color: COLORS.primary, alignSelf: 'flex-start', margin: 20 }]}>
            {userShippingDetails.price} <CoinIcon />
          </Text>

          <CustonButton
            text='רכישה'
            onPress={() => { navigation.navigate('ApprovedPurchase') }}
          />

        </View>
      </View>


    </View>
  )
}
const style = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
  },
  profileImage: {
    width: 80,
    height: 80,
    top: 60,
    alignSelf: 'center',
    borderRadius: 100,
    overflow: 'hidden',
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
  },

  AdressCard: {
    height: 120,
    width: cardWidth,
    backgroundColor: COLORS.white,
    elevation: 15,
    marginHorizontal: 10,
    borderRadius: 10,
    top: 100,
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    //flexDirection:'row',
  },
  AdressCardContent: {
    margin: 5,
    alignSelf: 'baseline',
    flexDirection: 'row-reverse',
  },
  icon: {
    marginLeft: 120,
    alignSelf: 'flex-end',
    marginBottom: 15,
  },
  txtcontainer: {
    flexDirection: 'column',
    margin: 10
  },

  txtTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primary,
    alignSelf: 'flex-start',
  },
  txt: {
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.grey,
    alignSelf: 'flex-start',

  },

  AddNewAddress: {
    height: 70,
    width: cardWidth,
    backgroundColor: COLORS.white,
    elevation: 15,
    marginHorizontal: 10,
    borderRadius: 10,
    top: 200,
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  AddNewAddressContent:{
    flexDirection: 'row',
  },
  txtTitleAddAddress: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primary,
    alignSelf: 'flex-start',
    margin: 20,
  },
  iconAddAdress: {
    marginLeft: 160,
    alignSelf: 'flex-end',
  },

  priceTag: {
    height: 40,
    alignItems: 'center',
    bottom: 65,
    width: 150,
    left: 100,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
    flexDirection: 'row',
  },
  btn: {
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 40,
    backgroundColor: COLORS.primary,
    marginHorizontal: 20,
    borderRadius: 10,
  },

});

export default GiftPurchase