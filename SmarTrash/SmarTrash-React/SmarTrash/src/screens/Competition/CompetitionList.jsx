import { View, Text, StyleSheet, Image, Dimensions,FlatList } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import COLORS from '../../Consts/colors';
import { MaterialIcons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import CompetitionCard from '../../Components/CompetitionCard/CompetitionCard';
import { GlobalContext } from '../../../GlobalContext/GlobalContext'

const apiUrl = 'http://proj.ruppin.ac.il/bgroup91/prod/api/Competition/GetListOfUsersInMyCity';

const { width } = Dimensions.get('screen');
const cardWidth = width / 1.06;

const CompetitionList=()=> {
  const [usersPlaces, setUsersPlaces] = useState('');
  const {userEmail} = useContext(GlobalContext);
 
  useEffect(() => {

    fetch(apiUrl, {
      method: 'POST',
      body: JSON.stringify({UserEmail:userEmail}),
      headers: new Headers({
        'Content-type': 'application/json; charset=UTF-8',
        'Accept': 'application/json; charset-UTF-8'

      })
    }).then(response => { return response.json() })
      .then(data => {   console.log('gbgfgvf',data)
        data.map(st => setUsersPlaces(st))
     

      });
  }
    , []);


    console.log('usersPlaces',usersPlaces)
  return (
    <View style={{ backgroundColor: COLORS.white, flex: 1 }}>

      <View style={style.titleContainer}>
        <View style={style.profileImage}>
          <Image
            style={style.image}
            source={{ uri: 'https://www.thehandbook.com/cdn-cgi/image/width=300,height=300,fit=cover,q=85/https://files.thehandbook.com/uploads/2019/12/22708923_288175598347572_5346731196820750336_n.jpg' }} />
        </View>
        <View style={style.txtTitleContainer}>
          <Text style={style.txtTitle}>{'המתחרים בעיר שלך'}</Text>
          
        </View> 
      </View>
      <View>
      <CompetitionCard   />
          {/* <FlatList
            data={usersPlaces}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingLeft: 20,
              marginTop: 20,
              paddingBottom: 30,
            }}
            renderItem={({ item }) => <CompetitionCard usersPlaces={item}  />}
          /> */}
        
  </View>
  </View>
  )
}
export default CompetitionList;
const style = StyleSheet.create({
  topHotelCard: {
    height: 100,
    width: cardWidth,
    backgroundColor: 'black',
    margin: 10,
    borderRadius: 10,
    elevation: 15,
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  txtTitle: {
    fontFamily: 'HelveticaNeue',
    color: '#52575D',
    fontSize: 24,
    fontWeight: 'bold',
    top: 50,
    textAlign: 'center',
  },
  profileImage: {
    width: 60,
    height: 60,
    top: 60,
    borderRadius: 100,
    overflow: 'hidden',
    marginRight: 15,
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
  titleContainer: {
    flexDirection: 'row-reverse',
    marginBottom: 20,
  },
  txtTitleContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignContent: 'flex-end',
  },
  txtCard: {
    fontFamily: 'HelveticaNeue',
    color: '#52575D',
    fontSize: 16,
    fontWeight: 'bold',
    margin: 10,
  },
  pointIcon: {
    marginTop: 8,
  },


});