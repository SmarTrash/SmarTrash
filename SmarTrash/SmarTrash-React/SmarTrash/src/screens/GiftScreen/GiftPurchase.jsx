import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, Button } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import COLORS from '../../Consts/colors';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { GlobalContext } from '../../../GlobalContext/GlobalContext'
import CoinIcon from '../../Components/Icon/CoinIcon';


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
    <View>

      <View style={{ alignSelf: 'center' }}>
        <View style={style.profileImage}>
          <Image
            style={style.image}
            source={{ uri: userImg }} />
        </View>
      </View>
      <Text style={{ fontSize: 25, fontWeight: 'bold', color: COLORS.primary, alignSelf: "flex-start", top: 60, paddingRight: 20 }}>
        {'כתובת '}
      </Text>
      <View style={style.topHotelCard}>
        <View
          style={{
            position: 'absolute',
            top: 5,
            right: 5,
            zIndex: 1,
            flexDirection: 'row',
          }}>
          <View style={{ alignSelf: 'flex-end' }} top={50}>
            <Ionicons name="md-checkmark-circle" size={60} color={COLORS.primary} />

          </View>
        </View>
        <View style={{ paddingVertical: 3, paddingHorizontal: 10 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: COLORS.primary, alignSelf: 'flex-start', margin: 10 }}>
            {'כתובת ברירת מחדל'}
          </Text>
          <Text style={{ fontSize: 18, fontWeight: 'bold', alignSelf: 'flex-start', margin: 5 }}>{userShippingDetails.StreetNameAndNumber}</Text>
          <Text style={{ fontSize: 15, fontWeight: 'bold', color: COLORS.grey, alignSelf: 'flex-start', margin: 5 }}>
            {userShippingDetails.city}
          </Text>
          <Text style={{ fontSize: 15, fontWeight: 'bold', color: COLORS.grey, alignSelf: 'flex-start', margin: 5 }}>
            {userShippingDetails.Phone}
          </Text>
        </View>

        {/* הוספת כתובת */}

        <View style={style.AddNewAddress}>
          <View
            style={{
              position: 'absolute',
              top: 5,
              right: 5,
              zIndex: 1,
              flexDirection: 'row',
            }}>
            <View style={{ alignSelf: 'flex-end' }} top={5}>
              <MaterialCommunityIcons name="plus-circle" size={50} color={COLORS.primary} />
            </View>
          </View>
          <TouchableOpacity onPress={AddNewAdress}>
            <View style={{ paddingVertical: 3, paddingHorizontal: 10 }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: COLORS.primary, alignSelf: 'flex-start', margin: 20, }}>
                {'הוסף כתובת'}
              </Text>
            </View>
          </TouchableOpacity>

          {/* סה"כ נקודות - טקסט*/}
          <View style={{ top: 40 }}>
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
          <View style={{ bottom: 70 }}>
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
              <Button
                title='רכישה'
                text="רכישה"
                onClick={() => { navigation.navigate('ApprovedPurchase') }}
              />
            </View>
          </View>
        </View>
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

  },
  AddNewAddress: {
    height: 70,
    width: cardWidth,
    backgroundColor: COLORS.white,
    elevation: 15,
    marginHorizontal: 10,
    borderRadius: 10,
    top: 80,
    right: 10,

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