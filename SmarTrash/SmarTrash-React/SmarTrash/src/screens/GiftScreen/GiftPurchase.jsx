import { FAB, Text, List, RadioButton } from 'react-native-paper'
import { View, FlatList, StyleSheet,SafeAreaView, Image,Alert } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import COLORS from '../../Consts/colors';
import { GlobalContext } from '../../../GlobalContext/GlobalContext'
import CustonButton from '../../Components/CustomButton/CustonButton'
import CoinIcon from '../../Components/Icon/CoinIcon';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons, } from '@expo/vector-icons';

const apiUrl = 'http://proj.ruppin.ac.il/bgroup91/prod/api/Gift/ShippingDetails/';
const apiUrlGiftOrder = 'http://proj.ruppin.ac.il/bgroup91/prod/api/Gift/GiftOrder/';

const GiftPurchase = ({ navigation, route }) => {

  useEffect(() => {
    ShippingDetails();
  }, []);


  const { userOrderStreetNameAndNumber, userOrderPhone, userEmail, userImg, userCityName, selectedCity, userPoints, setUserPoints } = useContext(GlobalContext);
  const [userShippingDetails, setUserShippingDetails] = useState({});
  const giftId = route.params;
  const [notes, setNotes] = useState([]);
  const [choosenAdress, setChoosenAdress] = useState();
  const [checkboxState, setCheckboxState] = useState(false);

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
          P: data[0].Phone
        }
        setNotes([note])

      });
  }

  const addAdress = note => {
    note.id = notes.length + 1;
    console.log({ note });
    setNotes([...notes, note])
  }

  const chooseAdress = (item) => {
    setCheckboxState(!checkboxState)
    if (!checkboxState == true) {
      setChoosenAdress(item.id - 1)

      console.log("zzzzzzz", choosenAdress)
    }


  }
  const onPurchase = () => {
    console.log("dddddddddddddd", checkboxState, choosenAdress, notes[choosenAdress].userOrderPhone, notes[choosenAdress].userOrderStreetNameAndNumber, selectedCity);
    if (notes[choosenAdress].userOrderStreetNameAndNumber != null && notes[choosenAdress].userOrderPhone != null) {
      fetch(apiUrlGiftOrder + giftId, {
        method: 'POST',
        body: JSON.stringify({ UserEmail: userEmail, Phone: notes[choosenAdress].userOrderPhone, StreetNameAndNumber: notes[choosenAdress].userOrderStreetNameAndNumber, CityId: selectedCity }),
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
    else {
      alert("אנא מלא פרטים")
    }

  }
  const getItem = (id,S,P) => {
 
    Alert.alert(S);
 
  }
  const ItemRender = ({ id,S,P }) => (
    <View style={styles.item}>
      <Text style={styles.itemText} onPress={()=> getItem(id,S,P)}>{S}</Text>
    </View>
  );
  const ItemDivider = () => {
    console.log("ffff")
    return (
      <View
        style={{
          height: 50,
          width: "100%",
          backgroundColor: "#607D8B",
        }}
      />
    );
  }
  console.log("notes:", notes)
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

        <View>
        <SafeAreaView style={styles.MainContainer}>
 
          <FlatList
              data={notes}
              renderItem={({ item }) => <ItemRender name={item.name} />}
              keyExtractor={item => item.id}
              ItemSeparatorComponent={ItemDivider}
                // title={item.id == "0" ? "כתובת ברירת מחדל" : "כתובת: " + item.id}
                // description={item.S + "\n" + item.userCityName
                //   + "\n" + item.P}
                detailsNumberOfLines={0}
                titleStyle={styles.listTitle}
                detailsStyle={styles.listTitle}
                descriptionNumberOfLines={3}
                // keyExtractor={item => item.id}
              />
            
            

            </SafeAreaView>
         
        </View>

        <View>
          <FAB style={styles.fab}
            icon= 'plus'
            label='הוסף כתובת'
            onPress={() => navigation.navigate('AddNewAdress', { addAdress })}
          />
        </View>

        <View style={styles.txtContainer}>

          <Text style={styles.txtPrice}>
            סה"כ נקודות: {userShippingDetails.points} <CoinIcon />
          </Text>

          <Text style={styles.txtPrice}>
            מחיר ההטבה: {userShippingDetails.price} <CoinIcon />
          </Text>

        </View>

        <CustonButton
          text='רכישה'
          onPress={() => {
            navigation.navigate('ApprovedPurchase',userShippingDetails.price )
          }}
         
        />
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
    backgroundColor: COLORS.white,
    width: '90%',
    marginTop: 150,
    alignSelf: 'center'

  },
  listTitle: {
    fontSize: 20,
  },
  itemStyle: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    margin: 10,
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    marginTop: 20,
  },
   
  MainContainer: {
    flex: 1,
    backgroundColor: 'white'
  },
  icon: {
    position: 'absolute',
    marginLeft: 330,
    marginTop: 55,

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

    marginBottom:50,
  },
  txtPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primary,
    margin: 5,
  },
  item: {
    paddingLeft: 15,
    paddingTop: 8,
    paddingBottom: 8
  },
 
  itemText: {
    fontSize: 24,
    color: 'black'
  }

})