import { View, StyleSheet, TouchableOpacity, Image, Text, Dimensions, FlatList, Animated } from 'react-native';
import React, { useEffect, useState, useContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { Ionicons, MaterialCommunityIcons, SimpleLineIcons, FontAwesome, Feather, AntDesign, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import SmallCard from '../../Components/Card/SmallCard';
import AsyncStorage from '@react-native-async-storage/async-storage'
import COLORS from '../../Consts/colors'
import { GlobalContext } from '../../../GlobalContext/GlobalContext'
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import registerForPushNotificationsAsync from '../../Components/PushNotification/PushNotification'
const { width } = Dimensions.get('screen');
const cardWidth = width / 1.8;
const apiUrl = 'http://proj.ruppin.ac.il/bgroup91/prod/api/Homepage/HomePageGifts';

export default function Home({ navigation }) {
  const {
    userEmail,
    setUserImg,
    userImg,
    checked,
    password,
    userFirstName,
    userLastName,
    userCompetitionPlace,
    userLastThrow,
    userPoints,
  } = useContext(GlobalContext);

  const [data, setData] = useState('');

  useEffect(() => {
    onScreenLoad();
    registerForPushNotificationsAsync();
  },[]);
  
  // const storeData = async (value) => {
  //   try {
  //     const jsonValue = JSON.stringify(value)
  //     console.log("dataaaaaa:", value);
  //     await AsyncStorage.setItem('@storage_Key', jsonValue)

  //     navigation.navigate('Home');
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }
  // const removeData = async () => {
  //   try {
  //     await AsyncStorage.removeItem('@storage_Key');
  //     {console.log("@storage_Key:",AsyncStorage)}
  //     navigation.navigate('SignInScreen');
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  
  // const getData = async () => {
  //   newUser.UserEmail=name;

  //   }).then(response => { return response.json() })
  //     .then(data => {
  //       console.log(data)
  //         setUserInfo(data);
  //       }).catch(console.log(err));
  //       console.log(userInfo)
  
  // }
  // const updateData = async () => {  
  //   let reg =/[a-zA-Z0-9]+[a-zA-Z0-9]+[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;
  //   console.log('userEmail:',userEmail)
  //   if (reg.test(userEmail) === true){
  //    setUserEmail(userEmail);
  //    console.log('valid:',userEmail)
  //    await AsyncStorage.mergeItem('UserData', JSON.stringify(userEmail));
  //    navigation.navigate('SignUpScreen');
  //   }
  //   else{ 
  //     console.log('email:',userEmail)
  //     alert('כתובת אימייל לא חוקית');
  //   }

  // }
  // const removeData = async () => {
  //   try {
  //       await AsyncStorage.removeItem('name');
  //       navigation.navigate('SignInScreen');
  //   } catch (error) {
  //       console.log(error);
  //   }
  // }
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@storage_Key')
       jsonValue != null ? JSON.parse(jsonValue) : null;
      console.log(jsonValue)
          if (value != null) {
            navigation.navigate('Home');
          }else{
            navigation.navigate('SignInScreen');
          }
          return jsonValue;
    } catch (error) {
      console.log(error);
    }
  }
  const scrollX = React.useRef(new Animated.Value(0)).current;

  const onScreenLoad = () => {
    fetch(apiUrl, {
      method: 'GET',
      headers: new Headers({
        'Content-type': 'application/json; charset=UTF-8',
        'Accept': 'application/json; charset-UTF-8'
      })
    }).then(response => { return response.json() })
      .then(data => {
        setData(data)
      });
  }
 setUserImg('data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwcHBggHBwgHCAcIBwoGCAgGBxsIFQcWIBEWIiARHx8YKCggGBolGx8TITEhJSkrLi4uFx8zODMsNygtLisBCgoKBQUFDgUFDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAKoAqgMBIgACEQEDEQH/xAAbAAEAAwEBAQEAAAAAAAAAAAAAAwUGBAECB//EAD0QAQACAQIBBwUMCwAAAAAAAAACAwQFEiIBEzIzQlJiFDFTsdEVI0FjcXKCg5GSoqMGESQ0Q2Fkc4HB4f/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwD9jAAAAAAAAEN99NMd1tkIuC3W8aHQjOz8ALUUnu//AE35/wDxLVruNLpxnX+MFsIKMrHyOqshJOAAAAAAAAAAAAAAApdS1fZuqxel2rPYl1vNlTTzEOss7X8mdB7Kcpy3Tlul3pvAAAB7Hl5Yy3Rltl3l3pury3c1lfRu9qjAbcU+h5u+Pks+lX1fyLgAAAAAAAAAAAHzPl21yl4AZPUbuezbpePZH/DmevAAAAAAATYd3M5NNvdnxNixDY4vLvopl3oRBMAAAAAAAAAAjt6qz5kkiO2yqqPvsubjLg4wYwez4bJRjxR7zwAAAAAABsMP90p/sxZBsKJ1TrjsshZGPBwAmAAAAAAAAAAVn6Qcn7B9OKzcOr1ytwLIw4pR4/sBlgAAAAAAAGh/R6G3Esl3rmeafRK+WrAju7XGCwAAAAAAAAAAABm9cxuZyd8Y7a7vWrGs1HF8rxpQ7XTr+VlOiDwAAAAHoLHRMWORk7px3V1+tpXHpeL5NiRjLrJcdjsAAAAAAAAAAAAAZ3XsTmrfKYdXZ0vlaJw6vyfr0+4GWAAAAWWiYnlGTzsurp9atanRoRjp9Pi45A7gAAAAAAAAAAAAAFdrlmzAlH0nAmys7GxunZxejh52e1HNnm27pcNceriDkAAAAabQbN+BGPo5yh/tmXTgZtuFZuhxRl0og1wrsfWMS3p+8y8fm+13x5YyjujLdEH0AAAAAAAA+ZTjCO6UtsfG+nNmYlWXXsn9GXcBy5GtY1XDD36Xg8ypytVy7uGMuZr7sPaizMG7Elxx3V9myHmcwPXgAAAAAAAJKL7seW6qycUYC6x9dlHhya93ih7Fpj5ePkdVZul3fhZnFxLsuW2qPzpfBBo8DT6sKPeu7VgOwAAAAAAAHzLkjKO2XFFU5miQlxYsub+Ln5lwAx1+Ndjy221zj4vgQtrLk5JcMuJw36VhW/w+bl8SDMC8noPor/v1uaWiZcejzMvrAVg7vcjUPQ/mcntSR0XNl0tkfrAVouoaDLt3/crdlGkYVXSjzkvGDO1UXXS21VzkuMPRO1lS+rh7VzCEYR2wjti+gRwrhVHZCO2PdSAAAAAAAAAAAAAAAAAAAAAAAAAAAD//2Q==')
  return (
    <SafeAreaView style={style.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={style.titleBar}>
          <SimpleLineIcons name="logout" size={24} color='#52575D' onPress={() => navigation.navigate('SignInScreen')} />
          <Ionicons name="notifications-outline" size={24} color='#52575D' onPress={() => navigation.navigate('Notifications')} />
        </View>

        <View style={{ alignSelf: 'center' }}>
          <View style={style.profileImage}>
            <Image
              style={style.image}
              source={{ uri: userImg }} />
          </View>
        </View>

        <View style={style.infoContainer}>
          <MaterialCommunityIcons style={style.editInfoIcon} name="account-edit" size={24} color="#52575D" onPress={() => navigation.navigate('EditProfile')} />
          <Text style={[style.text, { fontWeight: '200', fontSize: 30, }]}>{userFirstName + " " + userLastName}</Text>
        </View>

        <View style={style.statusContainer}>
          <View style={style.statusBox}>
            <Text style={[style.text, { fontSize: 24, }]}>{userLastThrow}</Text>
            <Text style={[style.text, style.subText]}>צבירה אחרונה</Text>
          </View>
          <View style={[style.statusBox, { borderColor: '#DFD8C8', borderLeftWidth: 1, borderRightWidth: 1 }]}>
            <Text style={[style.text, { fontSize: 24, }]}>{userPoints}</Text>
            <Text style={[style.text, style.subText]}>סה"כ נקודות</Text>
          </View>
          <View style={style.statusBox}>
            <Text style={[style.text, { fontSize: 24, }]}>{userCompetitionPlace}</Text>
            <Text style={[style.text, style.subText]}>מקומך בתחרות</Text>
          </View>
        </View>

        <View style={style.btnContainer}>
          <View>
            <View style={[style.sortBtn, { backgroundColor: '#557B83' }]}>
              <FontAwesome5 name="trash" size={60} color="black" />
            </View>
            <View>
              <Text style={[style.text, style.subText, { marginLeft: 27 }]}>לאן לזרוק</Text>
            </View>
          </View>
          <View>
            <View style={[style.sortBtn, { backgroundColor: '#39AEA9' }]}>
              <Feather name="map-pin" size={60} color="black" />
            </View>
            <View>
              <Text style={[style.text, style.subText, { marginLeft: 22 }]}>חיפוש פחים</Text>
            </View>
          </View>
          <View>
            <View style={[style.sortBtn, { backgroundColor: '#A2D5AB' }]}>
              <AntDesign name="play" size={60} color="black" />
            </View>
            <View>
              <Text style={[style.text, style.subText, { marginLeft: 37 }]}>שחק</Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => {
            navigation.navigate('ReceptBin')
          }}>
            <View>
              <View style={[style.sortBtn, { backgroundColor: '#E5EFC1' }]}>
                <FontAwesome5 name="recycle" size={60} color="black" />
              </View>
              <View>
                <Text style={[style.text, style.subText, { marginLeft: 22 }]}>מחזר ותרוויח</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: 20,
        }}>
          <Text onPress={() => {
            navigation.navigate('GiftsPage')
          }} style={[style.text, style.subText, { zIndex: 1, fontWeight: 'bold', color: COLORS.grey, top: 35, fontSize: 17 }]}>              ראה הכל
          </Text>
          <TouchableOpacity >


          </TouchableOpacity>
          <Text style={[style.text, style.subText, { color: COLORS.grey, top: 35, fontSize: 17 }]}>הטבות נבחרות</Text>
        </View>

        <View style={style.homeCard}>
          <FlatList
            data={data}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingLeft: 20,
              marginTop: 20,
              paddingBottom: 30,
            }}
            renderItem={({ item }) => <SmallCard data={item} />}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
  },
  titleBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginHorizontal: 15,
    marginBottom: 10,
  },
  homeCard: {
    top: 20
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: 'hidden',
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
  infoContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  text: {
    fontFamily: 'HelveticaNeue',
    color: '#52575D',
  },
  editInfoIcon: {
    marginRight: 10,
  },
  statusContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 32,
  },
  statusBox: {
    alignItems: 'center',
    flex: 1,
  },
  subText: {
    fontSize: 12,
    color: '#AEB5BC',
  },
  btnContainer: {
    flexDirection: 'row',
  },
  sortBtn: {
    marginTop: 40,
    marginRight: 12,
    marginLeft: 10,
    height: 80,
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  card: {
    height: 250,
    backgroundColor: COLORS.light,
    borderRadius: 10,
    marginBottom: 20,
    padding: 15,
    width,
    marginLeft: 10,
  },
  giftText: {
    fontFamily: 'HelveticaNeue',
    color: '#52575D',
    fontSize: 17,
    marginTop: 5,
    textAlign: 'center',
  },
  cardImage: {
    marginTop: 0,
    height: 150,
    width: 120,
    borderRadius: 10,
    flex: 1,
  },
  priceGift: {
    flexDirection: 'row-reverse',
  },
});

