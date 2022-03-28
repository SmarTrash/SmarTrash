import { Dimensions, FlatList, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image, Animated, } from 'react-native';
import React from 'react'
import COLORS from '../../Consts/colors';
import { useNavigation } from '@react-navigation/native';



const { width } = Dimensions.get('screen');
const cardWidth = width / 1.8;

const Card = ({ gifts, index}) => {

  const navigation = useNavigation();
  const [activeCardIndex, setActiveCardIndex] = React.useState(0);
  const scrollX = React.useRef(new Animated.Value(0)).current;
  
  const inputRange = [
    (index - 1) * cardWidth,
    index * cardWidth,
    (index + 1) * cardWidth,
  ];
  const opacity = scrollX.interpolate({
    inputRange,
    outputRange: [0.1, 0.1, 0.1],
  });
  const scale = scrollX.interpolate({
    inputRange,
    outputRange: [1, 1, 1],
  });


  return (
    <TouchableOpacity
    disabled={activeCardIndex != index}
    activeOpacity={1}
    onPress={() => { navigation.navigate('SelectedGift', gifts) }}>
    <Animated.View style={[style.shadowProp, { ...style.card, transform: [{ scale }], marginLeft: 12 }]}>
      <Animated.View style={{ ...style.cardOverLay, opacity }} />
      <View style={style.priceTag}>
        <Text
          style={{ color: COLORS.white, fontSize: 15, fontWeight: 'bold' }}>
          ${gifts.Price}
        </Text>
      </View>
      <Image source={gifts.img} style={style.cardImage} />
      <View style={style.cardDetails}>
        <View
          style={{ flexDirection: 'row', justifyContent: 'space-between', bottom: 18, alignSelf: 'flex-end', right: 13 }}>
          <View >
            <Text style={{ fontWeight: 'bold', fontSize: 14 }}>
              {gifts.GiftName}
            </Text>
            <Text style={{ color: COLORS.grey, fontSize: 12, alignSelf: 'flex-end' }}>
              {gifts.Brand}
            </Text>
            </View>
          </View>
          </View>
          </Animated.View>
      </TouchableOpacity>

  );
};


export default Card;
const style = StyleSheet.create({
  header: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  categoryListContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 80,
  },
  categoryListText: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  card: {
    height: 220,
    width: 180,
    elevation: 15,
    marginRight: 20,
    borderRadius: 15,
    backgroundColor: COLORS.white,

  },
  cardImage: {
    height: 200,
    width: '100%',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  priceTag: {
    height: 35,
    width: 80,
    backgroundColor: COLORS.primary,
    position: 'absolute',
    zIndex: 1,
    right: 0,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardDetails: {
    height: 80,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    position: 'absolute',
    bottom: 0,
    padding: 25,
    width: '100%',
    paddingRight:1,
    
  },
  cardOverLay: {
    height: 280,
    backgroundColor: COLORS.white,
    position: 'absolute',
    zIndex: 100,
    width: cardWidth,
    borderRadius: 15,
  },
  topHotelCard: {
    height: 120,
    width: 120,
    backgroundColor: COLORS.white,
    elevation: 15,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  topHotelCardImage: {
    height: 80,
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