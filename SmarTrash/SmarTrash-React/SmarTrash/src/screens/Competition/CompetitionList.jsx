import { View, Text, StyleSheet, Image, FlatList,ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import COLORS from '../../Consts/colors';
import CompetitionCard from '../../Components/CompetitionCard/CompetitionCard';
import { GlobalContext } from '../../../GlobalContext/GlobalContext'

const apiUrl = 'http://proj.ruppin.ac.il/bgroup91/prod/api/Competition/GetListOfUsersInMyCity';

const CompetitionList = () => {

  const { userImg, userEmail } = useContext(GlobalContext);
  const [usersPlaces, setUsersPlaces] = useState('');

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
        setUsersPlaces(data);

      });
  } , []);

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
     
      <ScrollView showsVerticalScrollIndicator={false} horizontal={false} style={{marginTop:80}} >
      <View>
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
      </ScrollView>
     
    </View>
  )
};

export default CompetitionList;
const style = StyleSheet.create({

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