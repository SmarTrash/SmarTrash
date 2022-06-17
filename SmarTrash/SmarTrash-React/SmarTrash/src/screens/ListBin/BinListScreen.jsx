import { View, Dimensions, StyleSheet, Text, Image, FlatList } from 'react-native';
import React, { useContext, useState, useEffect } from 'react';
import { GlobalContext } from '../../../GlobalContext/GlobalContext';
import COLORS from '../../Consts/colors';
import BinCard from '../../Components/BinCard/BinCard';

const url = 'http://proj.ruppin.ac.il/bgroup91/prod/api/BinSearch/GetBin';
const { width } = Dimensions.get('screen');
const cardWidth = width / 1.06;

const BinListScreen = () => {
  const [bins,setBins]=useState();
  const { userEmail } = useContext(GlobalContext);
  const { userImg } = useContext(GlobalContext);

  useEffect(() => {
    
    
    fetch(url, {
      method: 'POST',
      body:JSON.stringify({UserEmail: userEmail}),
      headers: new Headers({
        'Content-type': 'application/json; charset=UTF-8',
        'Accept': 'application/json; charset-UTF-8'
      })
    }).then(response => {return response.json()})
      .then(data => {
        console.log("רשימת פחים", {data} )
        //data.map(sb => setBins(sb))
        setBins(data)
      });
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white, }}>


      <View style={{ alignSelf: 'center', alignItems: 'center', flexDirection: 'column' }}>
        <View style={styles.profileImage}>
          <Image
            style={styles.image}
            source={{ uri: userImg }} />
        </View>
        <Text style={{ fontSize: 25, fontWeight: 'bold', color: COLORS.primary, top: 60, margin: 5 }}>
          הפחים בעיר שלך
        </Text>
      </View>

      <View style={{top:80}}>
        <FlatList
          data={bins}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingLeft: 20,
            marginTop: 20,
            paddingBottom: 30,
          }}
          renderItem={({ item, i }) =>
            <BinCard bins={item} index={i} />}
        />
      </View>


    </View>


  )
}

export default BinListScreen

const styles = StyleSheet.create({
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

})