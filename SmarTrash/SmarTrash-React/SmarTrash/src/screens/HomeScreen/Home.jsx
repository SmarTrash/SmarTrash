import { View, StyleSheet, TouchableOpacity, Image, Text, Dimensions, FlatList, Animated } from 'react-native';
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { Ionicons, MaterialCommunityIcons, SimpleLineIcons, FontAwesome, Feather, AntDesign, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import SmallCard from '../../Components/Card/SmallCard';
import AsyncStorage from '@react-native-async-storage/async-storage'
import COLORS from '../../Consts/colors'
import {CheckBox  } from 'react-native-elements'

const { width } = Dimensions.get('screen');
const cardWidth = width / 1.8;
const apiUrl = 'http://proj.ruppin.ac.il/bgroup91/prod/api/Homepage/HomePageGifts';
const userInfoUrl = 'http://proj.ruppin.ac.il/bgroup91/prod/api/HomePage/HomePageDetails';

export default function Home({ navigation }) {
  const [name, setName] = useState('');
  const [userInfo, setUserInfo] = useState('');
  useEffect( () => {
     getLoginData();
     onScreenLoad();
  },[]);


  const getLoginData = async () => {
    try {
      const value = await AsyncStorage.getItem('@storage_Key')
      if (value != null) {
        let user = JSON.parse(value);
        setName(user.UserEmail);
        await fetch(userInfoUrl, {
            method: 'POST',
            body: JSON.stringify({UserEmail:user.UserEmail}),
            headers: new Headers({
              'Content-type': 'application/json; charset=UTF-8',
              'Accept': 'application/json; charset-UTF-8'

            })
          }).then(response => response.json())
            .then(data => {
              setUserInfo(data[0]);
      });


      }
    }catch(err){
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
  const [activeCardIndex, setActiveCardIndex] = React.useState(0);
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
              source={{ uri: userInfo.Img }} />
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
          <View>
            <View style={[style.sortBtn, { backgroundColor: '#E5EFC1' }]}>
              <FontAwesome5 name="recycle" size={60} color="black" />
            </View>
            <View>
              <Text style={[style.text, style.subText, { marginLeft: 22 }]}>מחזר ותרוויח</Text>
            </View>
          </View>
        </View>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: 20,
        }}>
          <Text onPress={() => {
            navigation.navigate('GiftsPage', { UserEmail: name })}} style={[style.text, style.subText, { zIndex:1,afontWeight: 'bold', color: COLORS.grey, top: 35,fontSize:17 }]}>              ראה הכל
          </Text>
          <TouchableOpacity >


          </TouchableOpacity>
          <Text style={[style.text, style.subText, { color: COLORS.grey, top: 35,fontSize:17 }]}>הטבות נבחרות</Text>
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
<CheckBox/>
          
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

