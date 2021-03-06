
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import COLORS from '../../Consts/colors';
import { Ionicons } from '@expo/vector-icons';
import CustonButton from '../../Components/CustomButton/CustonButton';
import { GlobalContext } from '../../../GlobalContext/GlobalContext'
import CoinIcon from '../../Components/Icon/CoinIcon';
import AsyncStorage from '@react-native-async-storage/async-storage'

const { width } = Dimensions.get('screen');
const cardWidth = width / 1.06;
const apiUrl = 'http://proj.ruppin.ac.il/bgroup91/prod/api/Throw/ThrowGarbage/';

export default function ThrowPoints({ navigation }) {
  const { userEmail, userImg, binQRId,
    setUserLastThrow, setUserCompetitionPlace,
    setUserPoints, setBinQRId } = useContext(GlobalContext);
  const [throwInfo, setThrowInfo] = useState('');

  useEffect(() => {
    fetch(apiUrl + binQRId, {
      method: 'POST',
      body: JSON.stringify({ UserEmail: userEmail }),
      headers: new Headers({
        'Content-type': 'application/json; charset=UTF-8',
        'Accept': 'application/json; charset-UTF-8'
      })
    }).then(response => { return response.json() })
      .then(data => {
        data.map(st => setThrowInfo(st))
        setUserLastThrow(data[0].gainedPoints)
        setUserPoints(data[0].totalPoints)
        setUserCompetitionPlace(data[0].competitionPlace)
        updateData(data)

      });

    const updateData = async (u) => {
      AsyncStorage.getItem('@storage_Key')
        .then(data => {
          data = JSON.parse(data);
          data.Points = u[0].totalPoints;
          data.lastThrow = u[0].gainedPoints;
          data.competitionPlace = u[0].competitionPlace
          AsyncStorage.setItem('@storage_Key', JSON.stringify(data));
        }).done();
    }
  }, []);

  return (
    <View style={{ backgroundColor: COLORS.white, width, flex: 1 }}>
      <View style={{ alignSelf: 'center' }}>
        <View style={style.profileImage}>
          <Image
            style={style.image}
            source={{ uri: userImg }} />
        </View>
      </View>
      <View style={style.topHotelCard}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: COLORS.green, alignSelf: 'center', margin: 10, textAlign: 'center' }}>
          ?????????? ???????? ???? ???????? {throwInfo.First} !
        </Text>
        <View style={style.imageEarthContainer}>
          <Image
            style={style.imageEarth}
            source={{ uri: 'https://m.media-amazon.com/images/I/51udbTwCXvL._SL1000_.jpg' }} />
        </View>
      </View>
      <View style={style.topHotelCard}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: COLORS.green, alignSelf: 'center', margin: 10, textAlign: 'center' }}>
          {'?????????????? ????:'}
        </Text>
        <View style={style.txtContainer}>
          <Ionicons name="md-checkmark-circle" size={28} color={COLORS.green} style={style.ChkdIcon} />
          <Text style={style.text}>
            ???????????? {throwInfo.throwenWeight} ???????? ??????????
          </Text>
        </View>
        <View style={style.txtContainer}>
          <Ionicons name="md-checkmark-circle" size={28} color={COLORS.green} style={style.ChkdIcon} />
          <Text style={style.text}>
            ???????? {throwInfo.gainedPoints} ????????????
          </Text>
        </View>
      </View>
      <View style={style.pointsTxt}>
        <Text style={style.txtPoints}>
          {'????"?? ?????????????? ??????:  '}
          <Text style={[style.txtPoints]}>
            {throwInfo.totalPoints}
            <CoinIcon />
          </Text>
        </Text>
      </View>
      <View >
        <CustonButton
          text="???????? ?????? ???????? "
          onPress={() =>{  setBinQRId('Not yet scanned'), navigation.navigate('Home')}}
        />
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
    margin: 15,
    borderRadius: 10,
    top: 80,
    elevation: 15,
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  imageEarthContainer: {
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    width: 75,
    height: 75,
    marginTop: 20
  },
  imageEarth: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
  txtContainer: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
  },
  text: {
    color: '#52575D',
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
    margin: 10,
    textAlign: 'center'
  },
  ChkdIcon: {
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  pointsTxt: {
    marginTop: 70,
    margin: 15,
    justifyContent: 'flex-start',
  },
  txtPoints: {
    color: '#52575D',
    fontSize: 16,
    fontWeight: 'bold',
    margin: 20,
    flexDirection: 'row',
  },

});

