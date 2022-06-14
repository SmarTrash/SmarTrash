import { FAB, Text, List } from 'react-native-paper'
import Icon from 'react-native-vector-icons/AntDesign';
import { View, FlatList, StyleSheet, Image, } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import COLORS from '../../Consts/colors';
import { GlobalContext } from '../../../GlobalContext/GlobalContext'
import CustonButton from '../../Components/CustomButton/CustonButton'
import CoinIcon from '../../Components/Icon/CoinIcon';

const apiUrl = 'http://proj.ruppin.ac.il/bgroup91/prod/api/Gift/ShippingDetails/';

const GiftPurchase = ({ navigation, route }) => {

  useEffect(() => {
    ShippingDetails();
  }, []);


  const { userEmail, userImg, userCityName, selectedCity, userPhone, setUserPhone, setUserCityName, setUserStreetNameAndNumber, userStreetNameAndNumber, } = useContext(GlobalContext);
  const [userShippingDetails, setUserShippingDetails] = useState({});
  const giftId = route.params;

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
        console.log("dataaaaaaaaaaaaaaa", data)
        data.map(st => setUserShippingDetails(st))
        const note = {
          id: "1", selectedCity: data[0].city,
          userStreetNameAndNumber: data[0].StreetNameAndNumber,
          userPhone: data[0].Phone
        }
        setNotes([note])
        // 
        // setPointsLeft(userShippingDetails.points - userShippingDetails.price)
        // setUserPhone(userShippingDetails.Phone)
        // setUserStreetNameAndNumber(userShippingDetails.StreetNameAndNumber)
        // setUserCityName(userShippingDetails.city)
      });
  }

  const addNotes = note => {
    note.id = notes.length + 1;
    note.selectedCity = note.selectedCity;
    note.userStreetNameAndNumber = note.userStreetNameAndNumber;
    console.log({ note });
    setNotes([...notes, note])
  }
  const [notes, setNotes] = useState([]);
  const deleteNote = (item) => {
    let newNotes = notes.filter(note => note.id !== item.id)
    setNotes(newNotes)
  }
  console.log("notes:", notes)
  return (
    <>
      <View style={styles.container}>
        <View style={{ alignSelf: 'center', marginb: 20 }}>
          <View style={styles.profileImage}>
            <Image
              style={styles.image}
              source={{ uri: userImg }} />
          </View>
        </View>
        <FlatList
          data={notes}
          renderItem={({ item }) => (
            <List.Item style={styles.itemStyle}
              title={item.selectedCity == "" ? "כתובת ברירת מחדל" : "כתובת: " + item.id}
              description={item.userStreetNameAndNumber
                + "\n" + item.userPhone + "\n" + item.Phone}
              right={props => <Icon onPress={() => deleteNote(item)} size={40} name="delete" />}
              detailsNumberOfLines={1}
              titleStyle={styles.listTitle}
              detailsStyle={styles.listTitle}
            />
          )}
          keyExtractor={item => item.id}
        />
        <FAB
          small
          icon='plus'
          label='הוסף כתובת'
          onPress={() => navigation.navigate('AddNewAdress', { addNotes })}
        />
        <View >
          <View>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: COLORS.primary, alignSelf: 'flex-start', }}>
              {'סה"כ נקודות'}
            </Text>
          </View>
          {/* {'סה"כ נקודות'} */}
          <View>
            <Text style={[styles.priceTag, { fontSize: 20, fontWeight: 'bold', color: COLORS.primary, alignSelf: 'flex-start' }]}>
              {userShippingDetails.points} <CoinIcon />
            </Text>
          </View>
        </View>

        {/* מחיר הטבה - טקסט*/}
        <View >
          <View>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: COLORS.primary, alignSelf: 'flex-start' }}>
              {'מחיר הטבה'}
            </Text>
          </View>
          {/* {'מחיר הטבה'} */}
          <View>
            <Text style={[styles.priceTag, { fontSize: 20, fontWeight: 'bold', color: COLORS.primary, alignSelf: 'flex-start' }]}>
              {userShippingDetails.price} <CoinIcon />
            </Text>

            <CustonButton
              text='רכישה'
              onPress={() => { navigation.navigate('ApprovedPurchase') }}
            />

          </View>
        </View>
      </View>
    </>
  )
}

export default GiftPurchase;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 10,

  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  title: {
    fontSize: 30,
    fontWeight: '200'
  },
  fab: {
    backgroundColor: '#99FFFF',
    position: 'absolute',
    margin: 20,
    right: 0,
    bottom: 10
  },
  listTitle: {
    fontSize: 20,

  },
  itemStyle: {
    backgroundColor: 'lightgray',
    borderRadius: 10,
    margin: 10,
    marginTop: 80

  },
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
  header: {
    width: '100%',
    height: 40,
    alignItems: 'flex-start',
    justifyContent: 'center',
  }, modalBackGround: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },

})