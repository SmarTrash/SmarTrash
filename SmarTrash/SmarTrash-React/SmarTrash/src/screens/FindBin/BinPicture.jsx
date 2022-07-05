import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import CustonButton from '../../Components/CustomButton/CustonButton';
import LottieView from 'lottie-react-native';
import COLORS from '../../Consts/colors'
const BinPicture = ({ route, navigation }) => {
  const getImageUrl = () => {
    if (route.params.binName == "פח כתום") {
      return require('../../../assets/OrangeCan.json');
    } else if (route.params.binName == "פח סגול") {
      return require("../../../assets/PurpleCan.json");
    } else {
      console.log("defualt")
      return require("../../../assets/OrangeCan.json");
    }
  }

  const img = getImageUrl();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{route.params.binName == 'err' ? "מחזר\n לפח כתום" : "מחזר \nל" + route.params.binName}</Text>
        <LottieView style={{ width: 10, aspectRatio: 400 / 200, flexGrow: 1, alignSelf: 'center' }}
          resizeMode="center"
          source={img}
          autoPlay
        />
        <CustonButton
          text='חזרה לדף הבית'
          onPress={() => navigation.navigate('Home')} />
      </View>
    </View>
  )
}

export default BinPicture;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 16,
    fontSize: 20,
  },
  title: {
    marginTop: 120,
    fontSize: 50,
    fontWeight: 'bold',
    color: COLORS.black,
    textShadowColor: 'white',
    textShadowRadius: 3,
    textAlign: 'center',
  },
});