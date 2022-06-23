
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native'
import React, { useContext } from 'react'
import COLORS from '../../Consts/colors';
import { Ionicons } from '@expo/vector-icons';
import CustonButton from '../../Components/CustomButton/CustonButton';
import { GlobalContext } from '../../../GlobalContext/GlobalContext';
import CoinIcon from '../../Components/Icon/CoinIcon';


const { width } = Dimensions.get('screen');
const cardWidth = width / 1.06;
const ReceptBin = ({ navigation }) => {
  const { userImg } = useContext(GlobalContext);
  return (
    <View style={style.container}>
      <View>
        <View style={style.profileImage}>
          <Image
            style={style.image}
            source={{ uri: userImg }} />
        </View>
      </View>

      <View style={style.Card}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: COLORS.green, alignSelf: 'center', margin: 10, textAlign: 'center' }}>
          {'הפח נקלט בהצלחה !'}
        </Text>
        <Ionicons name="md-checkmark-circle" size={60} color={COLORS.green} style={style.checkIcon} />
      </View>

      <View>
        <View style={{ marginTop: 120 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: COLORS.green, margin: 20, textAlign: 'center', marginTop: 60 }}>
            {'עכשיו ניתן לזרוק את הפסולת לפח ולצבור נקודות!'}
          </Text>
        </View>
        <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
          <CoinIcon />
          <CoinIcon />
          <CoinIcon />
        </View>
      </View>
      
      <View style={{ marginTop: 70 }}>
        <CustonButton
          text="לחץ כאן לאחר הזריקה"
          onPress={() => navigation.navigate('ThrowPoints')}
        />
      </View>

    </View>
  )
}

export default ReceptBin;

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignSelf: 'center',
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
  Card: {
    height: 180,
    width: cardWidth,
    backgroundColor: COLORS.white,
    elevation: 15,
    marginHorizontal: 10,
    borderRadius: 10,
    top: 80,
    elevation: 15,
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,

  },
  topHotelCardImage: {
    height: 250,
    width: cardWidth,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  checkIcon: {
    justifyContent: 'center',
    textAlign: 'center',
    marginTop: 20,
  },

});

