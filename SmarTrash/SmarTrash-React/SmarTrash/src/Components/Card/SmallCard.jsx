import { View, Text, StyleSheet, Image,TouchableOpacity } from 'react-native'
import React from 'react'
import COLORS from '../../Consts/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const SmallCard = (props) => {
  const navigation = useNavigation();
    console.log("hereee");
    console.log("2");

    return (
      <TouchableOpacity onPress={() => { navigation.navigate('SelectedGift', props.data[0]) }}>
    <View
    style={[style.topHotelCard, style.shadowProp]}>
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
      <Image style={style.topHotelCardImage} source={{uri:props.data[0].Image}} />
      <View style={{ paddingVertical: 5, paddingHorizontal: 10 }}>
        <Text style={{ fontSize: 10, fontWeight: 'bold' }}>{props.data[0].GiftName}</Text>
        <Text style={{ fontSize: 7, fontWeight: 'bold', color: COLORS.grey }}>
          {props.data[0].Brand}
        </Text>
      </View>
    </View>
    </TouchableOpacity>
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
    right: 20
  },
  topHotelCardImage: {
    height: 140,
    width: '100%',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});
export default SmallCard