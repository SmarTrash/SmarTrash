import { View, StyleSheet, TouchableOpacity, Image, Text, Dimensions, FlatList, Animated } from 'react-native';
import React, { useEffect, useState, useContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { Ionicons, MaterialCommunityIcons, SimpleLineIcons, FontAwesome, Feather, AntDesign, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import SmallCard from '../../Components/Card/SmallCard';
import AsyncStorage from '@react-native-async-storage/async-storage'
import COLORS from '../../Consts/colors'
import { GlobalContext } from '../../../GlobalContext/GlobalContext'

const { width } = Dimensions.get('screen');
const cardWidth = width / 1.8;
const apiUrl = 'http://proj.ruppin.ac.il/bgroup91/prod/api/Homepage/HomePageGifts';
const userInfoUrl = 'http://proj.ruppin.ac.il/bgroup91/prod/api/HomePage/HomePageDetails';

export default function Home({ navigation }) {
  const { userEmail, setUserImg, userImg, checked, password } = useContext(GlobalContext);
  const [userInfo, setUserInfo] = useState('');
  const newUser = {
    UserEmail: userEmail,
    Password: password
  };

  useEffect(() => {
    console.log("@newUser:",userEmail)
    getLoginData();
    onScreenLoad();
    if (checked) {
      storeData(newUser)
    }
    // else{
    //   removeData(newUser)
    // }
  
  });

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      console.log("dataaaaaa:", value);
      await AsyncStorage.setItem('@storage_Key', jsonValue)

      navigation.navigate('Home');
    } catch (e) {
      console.log(e);
    }
  }
  // const removeData = async () => {
  //   try {
  //     await AsyncStorage.removeItem('@storage_Key');
  //     {console.log("@storage_Key:",AsyncStorage)}
  //     navigation.navigate('SignInScreen');
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  const getLoginData = async () => {
    try {
      await fetch(userInfoUrl, {
        method: 'POST',
        body: JSON.stringify({ UserEmail: userEmail }),
        headers: new Headers({
          'Content-type': 'application/json; charset=UTF-8',
          'Accept': 'application/json; charset-UTF-8'
        })
      }).then(response => response.json(),    console.log("@response:",response))
        .then(data => {
          setUserInfo(data[0]);
          console.log("@serInfo:",data[0])
        });
    } catch (err) {
      console.log(err);
    }
  }
  // const newUser = {
  //   UserEmail:"" 
  // };
  // const getData = async () => {
  //   newUser.UserEmail=name;

  //   }).then(response => { return response.json() })
  //     .then(data => {
  //       console.log(data)
  //         setUserInfo(data);
  //       }).catch(console.log(err));
  //       console.log(userInfo)
  //
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

  const scrollX = React.useRef(new Animated.Value(0)).current;

  const [data, setData] = React.useState('');


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
  setUserImg('data:image/jpeg;base64,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')
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
          <Text style={[style.text, { fontWeight: '200', fontSize: 30, }]}>{userInfo.First + " " + userInfo.Last}</Text>
        </View>

        <View style={style.statusContainer}>
          <View style={style.statusBox}>
            <Text style={[style.text, { fontSize: 24, }]}>{userInfo.lastThrow}</Text>
            <Text style={[style.text, style.subText]}>צבירה אחרונה</Text>
          </View>
          <View style={[style.statusBox, { borderColor: '#DFD8C8', borderLeftWidth: 1, borderRightWidth: 1 }]}>
            <Text style={[style.text, { fontSize: 24, }]}>{userInfo.Points}</Text>
            <Text style={[style.text, style.subText]}>סה"כ נקודות</Text>
          </View>
          <View style={style.statusBox}>
            <Text style={[style.text, { fontSize: 24, }]}>{userInfo.competitionPlace}</Text>
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

