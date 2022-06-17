import { FAB, Text, List, RadioButton } from 'react-native-paper'
import Icon from 'react-native-vector-icons/AntDesign';
import { View, FlatList, StyleSheet, Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import COLORS from '../../Consts/colors';
import { GlobalContext } from '../../../GlobalContext/GlobalContext'
import CustonButton from '../../Components/CustomButton/CustonButton'
import CoinIcon from '../../Components/Icon/CoinIcon';
import BouncyCheckbox from "react-native-bouncy-checkbox";

const apiUrl = 'http://proj.ruppin.ac.il/bgroup91/prod/api/Gift/ShippingDetails/';
const apiUrlGiftOrder = 'http://proj.ruppin.ac.il/bgroup91/prod/api/Gift/GiftOrder/';

const GiftPurchase = ({ navigation, route }) => {

  useEffect(() => {
    ShippingDetails();
  }, []);


  const { userEmail, userImg, userCityName, selectedCity, userPoints, setUserPoints, userPhone, setUserPhone, setUserCityName, setUserStreetNameAndNumber, userStreetNameAndNumber, } = useContext(GlobalContext);
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
          id: "0", userCityName: data[0].city,
          userStreetNameAndNumber: data[0].StreetNameAndNumber,
          userPhone: data[0].Phone
        }
        setNotes([note])

      });
  }

  const addAdress = note => {
    note.id = notes.length + 1;

    console.log({ note });
    setNotes([...notes, note])
  }
  const [notes, setNotes] = useState([]);
  const [choosenAddress, setChoosenAddress] = useState();
  const deleteNote = (item) => {
    setCheckboxState(!checkboxState)
    if (!checkboxState == true) {
       setChoosenAddress(item.id-1)
     
      console.log("zzzzzzz",choosenAddress)
    }


  }
  const onPurchase = () => {
    console.log("dddddddddddddd",checkboxState, choosenAddress, notes[choosenAddress].userPhone, notes[choosenAddress].userStreetNameAndNumber, selectedCity);
    fetch(apiUrlGiftOrder + giftId, {
      method: 'POST',
      body: JSON.stringify({ UserEmail: userEmail, Phone: notes[choosenAddress].userPhone, StreetNameAndNumber: notes[choosenAddress].userStreetNameAndNumber, CityId: selectedCity }),
      headers: new Headers({
        'Content-type': 'application/json; charset=UTF-8',
        'Accept': 'application/json; charset-UTF-8'
      })
    }).then(response => { return response.json() })
      .then(data => {
        console.log("cataaaaaaaaaaaaaaa", data)
        setUserPoints(data)

      });
    navigation.navigate('ApprovedPurchase')
  }
  const [checkboxState, setCheckboxState] = useState(false);
  console.log("notes:", notes)
  return (
    <>
      <View style={{ backgroundColor: '#fff' }}>
        <View style={{ alignSelf: 'center', margin: 60 }}>
          <View style={styles.profileImage}>
            <Image
              style={styles.image}
              source={{ uri: userImg }} />
          </View>
        </View>
      </View>
      <View style={styles.container}>
        <FlatList
          data={notes}
          renderItem={({ item }) => (
            <List.Item style={styles.itemStyle}
              title={item.id == "0" ? "כתובת ברירת מחדל" : "כתובת: " + item.id}
              description={item.userStreetNameAndNumber + "\n" + item.userCityName
                + "\n" + item.userPhone}
              right={props =>   <RadioButton
              radio_props={notes.length}
              initial={0}
              onPress={(id) => {
                console.log("value",id);
                deleteNote(id)
              }}
            />} 
              // <BouncyCheckbox size={35} unfillColor="#FFFFFF" iconStyle={{ borderColor: "black" }} fillColor={COLORS.green} onPress={() => deleteNote(item)} />}
              detailsNumberOfLines={0}
              titleStyle={styles.listTitle}
              detailsStyle={styles.listTitle}
              descriptionNumberOfLines={3}
            />
          )}
          keyExtractor={item => item.id}
        />
        <FAB style={styles.fab}
          small
          icon='plus'
          label='הוסף כתובת'
          onPress={() => navigation.navigate('AddNewAdress', { addAdress })}
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
            <Text style={[styles.priceTag, { fontSize: 20, fontWeight: 'bold', color: COLORS.primary, alignSelf: 'flex-start', }]}>
              {userShippingDetails.price} <CoinIcon />
            </Text>

            <CustonButton
              text='רכישה'
              onPress={() => onPurchase()}
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

  }, fab: {
    position: 'absolute',
    margin: 20,
    right: 0,
    bottom: 0,
    backgroundColor: '#99FFFF'
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
    bottom: 200
  },
  listTitle: {
    fontSize: 20,


  },
  itemStyle: {
    backgroundColor: 'lightgray',
    borderRadius: 10,
    margin: 10,


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
  priceTag: {

    alignItems: 'center',
    left: 150,
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