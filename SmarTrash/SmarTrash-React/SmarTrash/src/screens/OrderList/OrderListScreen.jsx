import { View, Dimensions, StyleSheet, Text, Image, FlatList, ScrollView } from 'react-native';
import React, { useContext, useState, useEffect } from 'react';
import { GlobalContext } from '../../../GlobalContext/GlobalContext';
import COLORS from '../../Consts/colors';
import OrderCard from '../../Components/OrderCard/OrderCard';

const url = 'http://proj.ruppin.ac.il/bgroup91/prod/api/Gift/GetUserOrders';
const { width } = Dimensions.get('screen');
const cardWidth = width / 1.06;

const OrderListScreen = () => {

  const { userEmail } = useContext(GlobalContext);
  const { userImg } = useContext(GlobalContext);
  const [shippingDetails, setsShippingDetails] = useState('');
  useEffect(() => {


    fetch(url, {
      method: 'GET',
      body: JSON.stringify({ UserEmail: userEmail }),
      headers: new Headers({
        'Content-type': 'application/json; charset=UTF-8',
        'Accept': 'application/json; charset-UTF-8'
      })
    }).then(response => { return response.json() })
      .then(data => {
        console.log("רשימת הזמנות", { data })
       
        setsShippingDetails(data)
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
        <Text style={{ fontSize: 25, fontWeight: 'bold', color: COLORS.green, top: 60, margin: 5 }}>
          ההזמנות שלך
        </Text>
      </View>

      
        <FlatList
          data={shippingDetails}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingLeft: 20,
            marginTop: 20,
            paddingBottom: 30,
          }}
          renderItem={({ item, i }) =>
            <OrderCard shippingDetails={item} index={i} />
        }
        />
    </View>
  )
}

export default OrderListScreen

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