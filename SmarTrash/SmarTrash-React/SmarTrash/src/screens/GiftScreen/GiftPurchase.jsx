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

  const [notes, setNotes] = useState([]);
  const { userEmail, userImg,userCityName, setUserCityName, setUserStreetNameAndNumber,userStreetNameAndNumber, } = useContext(GlobalContext);
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
        data.map(st => setUserShippingDetails(st))
        setPointsLeft(userShippingDetails.points - userShippingDetails.price)

      });
  }
  const addNotes = note => {
    note.id = notes.length + 1;
    note.userCityId = note.userCityId;
    note.userStreetNameAndNumber = note.userStreetNameAndNumber;
    setNotes([...notes, note])
  }

  const deleteNote = (item) => {
    let newNotes = notes.filter(note => note.id !== item.id)
    setNotes(newNotes)
  }
  console.log("notes:", notes)
  return (
<<<<<<< Updated upstream
    <View style={style.container}>

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

=======
    <>
     <View style={styles.container}>
        <View style={{ alignSelf: 'center' }}>
          <View style={styles.profileImage}>
            <Image
              style={styles.image}
              source={{ uri: userImg }} />
>>>>>>> Stashed changes
          </View>
        </View>
        {notes.length === 0 ?
        
          <View style={styles.titleContainer}>
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

          </View>
          :
          
          <FlatList
            data={notes}
            renderItem={({ item }) => (
              <List.Item style={styles.itemStyle}
                title={item.noteTitle}
                description={item.noteDetails}
                right={props => <Icon onPress={() => deleteNote(item)} size={40} name="delete" />}
                detailsNumberOfLines={1}
                titleStyle={styles.listTitle}
                detailsStyle={styles.listTitle}

              />
            )}
            keyExtractor={item => item.id}

          />

        }
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
            <Text style={[styles.priceTag, { fontSize: 20, fontWeight: 'bold', color: COLORS.primary, alignSelf: 'flex-start'}]}>
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
<<<<<<< Updated upstream
const style = StyleSheet.create({
  container: {
    backgroundColor:COLORS.white,
=======

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
    marginTop:80

>>>>>>> Stashed changes
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