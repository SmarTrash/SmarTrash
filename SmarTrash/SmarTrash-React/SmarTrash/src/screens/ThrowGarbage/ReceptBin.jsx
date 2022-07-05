
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native'
import React, { useContext } from 'react'
import COLORS from '../../Consts/colors';
import CustonButton from '../../Components/CustomButton/CustonButton';
import { GlobalContext } from '../../../GlobalContext/GlobalContext';
import LottieView from 'lottie-react-native';

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
      <Text style={{ fontSize: 26, fontWeight: 'bold', color: COLORS.green, alignSelf: 'center', margin: 10, textAlign: 'center' }}>
        {' הפח נקלט בהצלחה !\n'}
        {'עכשיו ניתן לזרוק את הפסולת לפח ולצבור נקודות!'}
      </Text>
      <View style={{ height: '30%', margin: 50 }}>
        <LottieView style={{ width: 20, aspectRatio: 300 / 300, flexGrow: 1, alignSelf: 'center' }}
          resizeMode="cover"
          source={require('../../../assets/SuccessBin.json')}
          autoPlay
        />
      </View>
      <View >
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

