import { View, StyleSheet, TouchableOpacity, Image, Text, Dimensions, FlatList, Animated } from 'react-native';
import React, { useEffect, useState, useContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { Ionicons, MaterialCommunityIcons, SimpleLineIcons, Feather, AntDesign, FontAwesome5, } from '@expo/vector-icons';
import SmallCard from '../../Components/Card/SmallCard';
import AsyncStorage from '@react-native-async-storage/async-storage'
import COLORS from '../../Consts/colors'
import { GlobalContext } from '../../../GlobalContext/GlobalContext'
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

const { width } = Dimensions.get('screen');
const cardWidth = width / 1.8;
const apiUrl = 'http://proj.ruppin.ac.il/bgroup91/prod/api/Homepage/HomePageGifts';
const apiUrlPostToken = 'http://proj.ruppin.ac.il/bgroup91/prod/api/Homepage/PostToken';
const Home = ({ navigation }) => {
  const {
    userEmail,
    userImg,
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

  }, []);

  async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
      fetch(apiUrlPostToken, {
        method: 'POST',
        body: JSON.stringify({ UserEmail: userEmail, UserToken: token }),
        headers: new Headers({
          'Content-type': 'application/json; charset=UTF-8',
          'Accept': 'application/json; charset-UTF-8'
        })
      }).then(response => { return response.json() })
    } else {
      alert('Must use physical device for Push Notifications');
    }
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
    return token;
  }

  const removeData = async () => {
    try {
      await AsyncStorage.removeItem('@storage_Key');
      { console.log("@storage_Key:", AsyncStorage) }
      navigation.navigate('SignInScreen');
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

  return (
    <SafeAreaView style={style.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={style.titleBar}>
          <SimpleLineIcons name="logout" size={24} color='#52575D' onPress={() => removeData()} />
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
            <Text style={[style.text, { fontSize: 24, }]}>{userLastThrow == "0" ? "-" : userLastThrow}</Text>
            <Text style={[style.text, style.subText]}>צבירה אחרונה</Text>
          </View>
          <View style={[style.statusBox, { borderColor: '#DFD8C8', borderLeftWidth: 1, borderRightWidth: 1 }]}>
            <Text style={[style.text, { fontSize: 24, }]}>{userPoints}</Text>
            <Text style={[style.text, style.subText]}>סה"כ נקודות</Text>
          </View>
          <View style={style.statusBox}>
            <Text style={[style.text, { fontSize: 24, }]} onPress={() => navigation.navigate('CompetitionList')}>{userCompetitionPlace == "0" ? "-" : userCompetitionPlace}</Text>
            <Text style={[style.text, style.subText]} onPress={() => navigation.navigate('CompetitionList')}>מקומך בתחרות</Text>
          </View>
        </View>
        <View style={style.btnContainer}>
          <View>
          <TouchableOpacity onPress={() => { navigation.navigate('BinCameraScreen') }}>
            <View style={[style.sortBtn, { backgroundColor: '#557B83' }]}>
              <FontAwesome5  name="trash" size={50} color="black" />
            </View>
            <View>
              <Text style={[style.text, style.subText, { marginLeft: 18 }]} >לאן לזרוק</Text>
            </View>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity onPress={() => { navigation.navigate('Map') }}>
              <View style={[style.sortBtn, { backgroundColor: '#39AEA9' }]}>
                <Feather name="map-pin" size={50} color="black" />
              </View>
              <View>
                <Text style={[style.text, style.subText, { marginLeft: 10 }]}>חיפוש פחים</Text>
              </View>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => {
            navigation.navigate('Start')
          }}>
            <View>
              <View style={[style.sortBtn, { backgroundColor: '#A2D5AB' }]}>
                <AntDesign name="play" size={50} color="black" />
              </View>
              <View>
                <Text style={[style.text, style.subText, { marginLeft: 28 }]}>שחק</Text>
              </View>

            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            navigation.navigate('QRScanner')
          }}>
            <View>
              <View style={[style.sortBtn, { backgroundColor: '#E5EFC1' }]}>
                <FontAwesome5 name="recycle" size={50} color="black" />
              </View>
              <View>
                <Text style={[style.text, style.subText, { marginLeft: -5 }]}>מחזר ותרוויח</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: 20,
        }}>

          <Text style={[style.text, style.subText, { fontWeight: 'bold', color: COLORS.grey, top: 35, fontSize: 17, marginLeft: -20, padding: 10 }]}>הטבות נבחרות</Text>

          <Text onPress={() => {
            navigation.navigate('GiftsPage')
          }} style={[style.text, style.subText, { zIndex: 1, color: COLORS.primary, top: 35, fontSize: 17, marginRight: -8 }]}>ראה הכל
          </Text>
        </View>
        <TouchableOpacity >
        </TouchableOpacity>
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

export default Home
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
    width: 120,
    height: 120,
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
    paddingTop: 7,
    fontSize: 15,
    color: '#AEB5BC',
  },
  btnContainer: {
    flexDirection: 'row',
    marginTop: 15
  },
  sortBtn: {
    marginTop: 40,
    marginRight: 15,
    marginLeft: 7,
    height: 75,
    width: 70,
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