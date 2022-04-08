import { View, Text, StyleSheet, Image, Dimensions } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../Consts/colors';
import { MaterialCommunityIcons,Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('screen');
const cardWidth = width / 1.05;

const GiftPurchase = () => {
  return (
    <View>
      <View style={{ alignSelf: 'center' }}>
        <View style={style.profileImage}>
          <Image
            style={style.image}
            source={{ uri: 'https://www.thehandbook.com/cdn-cgi/image/width=300,height=300,fit=cover,q=85/https://files.thehandbook.com/uploads/2019/12/22708923_288175598347572_5346731196820750336_n.jpg' }} />
        </View>
      </View>
      <Text style={{ fontSize: 20, fontWeight: 'bold', color: COLORS.primary, alignSelf: 'flex-end', top: 75, right: 20 }}>
        {'כתובת '}
      </Text>
      <View style={style.topHotelCard}>
        <View
          style={{
            position: 'absolute',
            top: 5,
            right: 5,
            zIndex: 1,
            flexDirection: 'row',
          }}>
          <View right={300} top={50}>
            <Ionicons name="md-checkmark-circle" size={60} color={COLORS.primary} />
            
          </View>
        </View>
        <View style={{ paddingVertical: 3, paddingHorizontal: 10 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: COLORS.primary, alignSelf: 'flex-end', margin: 10 }}>
            {'כתובת 1'}
          </Text>
          <Text style={{ fontSize: 15, fontWeight: 'bold', alignSelf: 'flex-end', margin: 5 }}>{"יוספטל 3"}</Text>
          <Text style={{ fontSize: 12, fontWeight: 'bold', color: COLORS.grey, alignSelf: 'flex-end', margin: 5 }}>
            {"חיפה"}
          </Text>
          <Text style={{ fontSize: 12, fontWeight: 'bold', color: COLORS.grey, alignSelf: 'flex-end', margin: 5 }}>
            {"052-9589748"}
          </Text>
        </View>

        {/* הוספת כתובת */}

      <View style={style.AddNewAddress}>
        <View
          style={{
            position: 'absolute',
            top: 5,
            right: 5,
            zIndex: 1,
            flexDirection: 'row',
          }}>
          <View right={300} top={5}>
          <MaterialCommunityIcons name="plus-circle" size={50} color={COLORS.primary}/>
          </View>
        </View>
        <View style={{ paddingVertical: 3, paddingHorizontal: 10}}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: COLORS.primary, alignSelf: 'flex-end', margin:20,}}>
            {'כתובת 1'} 
          </Text>
        </View>
        </View>
      </View>
    </View>
  )
}
const style = StyleSheet.create({
  profileImage: {
    width: 50,
    height: 50,
    top: 60,
    left: 150,
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
    marginHorizontal: 10,
    borderRadius: 10,
    top: 80,

  },
  AddNewAddress: {
    height: 70,
    width: cardWidth,
    backgroundColor: COLORS.white,
    elevation: 15,
    marginHorizontal: 10,
    borderRadius: 10,
    top: 80,
    right:10,

  },
  topHotelCardImage: {
    height: 250,
    width: cardWidth,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },

});
export default GiftPurchase