import { View, Text, StyleSheet, SafeAreaView, Image, Dimensions, FlatList, Animated, } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import COLORS from '../../Consts/colors';
import CoinIcon from '../../Components/Icon/CoinIcon';
import { ScrollView } from 'react-native-gesture-handler';
import CompetitionCard from '../../Components/CompetitionCard/CompetitionCard';
import { GlobalContext } from '../../../GlobalContext/GlobalContext'

const apiUrl = 'http://proj.ruppin.ac.il/bgroup91/prod/api/Competition/GetListOfUsersInMyCity';
const { width } = Dimensions.get('screen');
const cardWidth = width / 1.06;

const CompetitionList = (navigation, route) => {
  const { userImg } = useContext(GlobalContext);
  const [usersPlaces, setUsersPlaces] = useState('');
  const { userEmail } = useContext(GlobalContext);
console.log(userEmail);
  useEffect(() => {

    fetch(apiUrl, {
      method: 'POST',
      body: JSON.stringify({ UserEmail: userEmail }),
      headers: new Headers({
        'Content-type': 'application/json; charset=UTF-8',
        'Accept': 'application/json; charset-UTF-8'

      })
    }).then(response => { return response.json() })
      .then(data => {
        console.log('gbgfgvf', data)
        // data.map(st => setUsersPlaces(st))
        setUsersPlaces(data);

      });
  }
    , []);

  console.log('usersPlaces', usersPlaces)
  return (

    <View style={{ flex: 1, backgroundColor: COLORS.white, }}>


      <View style={{ alignSelf: 'center', alignItems: 'center', flexDirection: 'column' }}>
        <View style={style.profileImage}>
          <Image
            style={style.image}
            source={{ uri: userImg }} />
        </View>
        <Text style={{ fontSize: 25, fontWeight: 'bold', color: COLORS.primary, top: 60, margin: 5 }}>
          המתחרים בעיר שלך
        </Text>
      </View>

      <View style={{top:80}}>
        <FlatList
          data={usersPlaces}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingLeft: 20,
            marginTop: 20,
            paddingBottom: 30,
          }}
          renderItem={({ item, i }) =>
            <CompetitionCard usersPlaces={item} index={i} />}
        />
      </View>


    </View>


    // {/* <ScrollView showsVerticalScrollIndicator={false}> */}

    // {/* <Animated.FlatList
    //     onMomentumScrollEnd={(e) => {
    //       setActiveCardIndex(
    //         Math.round(e.nativeEvent.contentOffset.x / cardWidth),
    //       );
    //     }}
    //     onScroll={Animated.event(
    //       [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    //       { useNativeDriver: true },
    //     )}

    //     data={usersPlaces}
    //     contentContainerStyle={{
    //       paddingVertical: 50,
    //       alignItems:'center',
    //       alignContent:'center', 
    //       alignSelf:'center',
    //       // justifyContent:'center', 
    //       // paddingLeft: 10,
    //       // paddingRight: cardWidth / 2 - 40,
    //     }}
    //     showsHorizontalScrollIndicator={false}
    //     renderItem={({ item, index }) => <CompetitionCard usersPlaces={item} index={index} />}
    //     snapToInterval={cardWidth}
    //   /> */}
    // {/* </ScrollView> */}

  )
};

export default CompetitionList;
const style = StyleSheet.create({

  txtTitle: {
    color: '#52575D',
    fontSize: 24,
    fontWeight: 'bold',
    top: 50,
    textAlign: 'center',
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

});