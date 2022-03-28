import { View, Text,StyleSheet,Image } from 'react-native'
import React from 'react'
import COLORS from '../../Consts/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';

const SmallCard = ({gifts}) => {
    return (
      <View style={[style.topHotelCard,style.shadowProp]}>
        <View
          style={{
            position: 'absolute',
            top: 5,
            right: 5,
            zIndex: 1,
            flexDirection: 'row',
          }}>
          <Icon name="star" size={15} color={COLORS.orange} />
        </View>
        <Image style={style.topHotelCardImage} source={gifts.img} />
        <View style={{paddingVertical: 5, paddingHorizontal: 10}}>
          <Text style={{fontSize: 10, fontWeight: 'bold'}}>{gifts.GiftName}</Text>
          <Text style={{fontSize: 7, fontWeight: 'bold', color: COLORS.grey}}>
            {gifts.Brand}
          </Text>
        </View>
      </View>
    );
  };
  const style = StyleSheet.create({
    
    topHotelCard: {
      height: 190,
      width: 130,
      backgroundColor: COLORS.white,
      elevation: 15,
      marginHorizontal: 10,
      borderRadius: 10,
      right:20
    },
    topHotelCardImage: {
      height: 140,
      width: '100%',
      borderTopRightRadius: 10,
      borderTopLeftRadius: 10,
    },
    shadowProp: {
      shadowColor: '#171717',
      shadowOffset: {width: -2, height: 4},
      shadowOpacity: 0.2,
      shadowRadius: 3,
    },
  });
export default SmallCard