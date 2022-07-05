import { FAB, Text } from 'react-native-paper'
import { View, FlatList, StyleSheet, Image, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import COLORS from '../../Consts/colors';
import { GlobalContext } from '../../../GlobalContext/GlobalContext'
import CustonButton from '../../Components/CustomButton/CustonButton'
import CoinIcon from '../../Components/Icon/CoinIcon';
import AddressItem from '../../Components/OrderCard/AdressItem';

const apiUrl = 'http://proj.ruppin.ac.il/bgroup91/prod/api/Gift/ShippingDetails/';
const apiUrlGiftOrder = 'http://proj.ruppin.ac.il/bgroup91/prod/api/Gift/GiftOrder/';

const GiftPurchase = ({ navigation, route }) => {

  const { userEmail, userImg, selectedCity, setUserPoints, specificAdress } = useContext(GlobalContext);
  const [userShippingDetails, setUserShippingDetails] = useState({});
  const giftId = route.params;
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    ShippingDetails();
  }, []);

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
        const note = {
          id: "0", userCityName: data[0].city,
          S: data[0].StreetNameAndNumber,
          P: data[0].Phone,
        }
        setNotes([note])
      });
  }

  const addAdress = note => {
    note.id = notes.length + 1;
    setNotes([...notes, note])
  }

  const onPurchase = () => {
    fetch(apiUrlGiftOrder + giftId, {
      method: 'POST',
      body: JSON.stringify({
        UserEmail: userEmail,
        Phone: specificAdress.P,
        StreetNameAndNumber: specificAdress.S,
        CityId: selectedCity
      }),
      headers: new Headers({
        'Content-type': 'application/json; charset=UTF-8',
        'Accept': 'application/json; charset-UTF-8'
      })
    }).then(response => { return response.json() })
      .then(data => {
        setUserPoints(data)
      });
    navigation.navigate('ApprovedPurchase')
  }

  return (
    <>
      <View style={styles.container}>
        <View style={{ backgroundColor: COLORS.white }}>
          <View style={{ alignSelf: 'center', marginBottom: 60 }}>
            <View style={styles.profileImage}>
              <Image
                style={styles.image}
                source={{ uri: userImg }} />
            </View>
          </View>
        </View>
        <ScrollView showsVerticalScrollIndicator={false} horizontal={false} >
          <View>
            <FlatList
              data={notes}
              renderItem={({ item }) => (
                <AddressItem specificAdres={item} />
              )}
              keyExtractor={item => item.id}
            />
          </View>
        </ScrollView>
        <View style={styles.txtContainer}>
          <FAB style={styles.fab}
            label='הוסף כתובת'
            onPress={() => navigation.navigate('AddNewAdress', { addAdress })}
            size="small"
          />
          <Text style={styles.txtPrice}>
            סה"כ נקודות: {userShippingDetails.points} <CoinIcon />
          </Text>
          <Text style={styles.txtPrice}>
            מחיר ההטבה: {userShippingDetails.price} <CoinIcon />
          </Text>
        </View>
        <View style={{ marginBottom: 20 }}>
          <CustonButton
            text='רכישה'
            onPress={() => onPurchase()}
          />
        </View>
      </View>
    </>
  )
}

export default GiftPurchase;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  fab: {
    position: 'absolute',
    backgroundColor: COLORS.green,
    fontSize: 10,
    right: 0,
    bottom: 90,
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
  txtContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    margin: 30,
    marginTop: 60
  },
  txtPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.black,
    margin: 10,
  },
})