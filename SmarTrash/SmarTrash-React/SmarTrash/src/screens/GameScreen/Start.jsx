import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import LottieView from 'lottie-react-native';
import COLORS from '../../Consts/colors';
import { Fontisto } from '@expo/vector-icons';
const Start = ({ navigation }) => {
  return (
    <View style={styles.MainContainer}>
      <LottieView style={{ width: 10, aspectRatio: 400 / 200, flexGrow: 1, alignSelf: 'center' }}
        resizeMode="center"
        source={require('../../../assets/Game.json')}
        autoPlay
      />
      <View style={{}}>
        <Text style={styles.title}>SmarTrash!</Text>
        <Text style={styles.instructions}>מיין כמה שיותר מוצרים לפחים המתאימים בזמן המוקצב </Text>
        {/* <View  >
          <Text style={styles.hit}>שבור את השיא של עצמך! </Text>
          <View style={styles.smiley}>
            <Fontisto name="smiley" size={24} color="black" />

          </View>
        </View> */}

      </View>
      <TouchableOpacity
        style={styles.customBtnBG}
        onPress={() => navigation.navigate('Game', { startAgain: false })}  >
        <Text style={styles.customBtnText}>התחל</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  MainContainer: {
    backgroundColor: COLORS.white,
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 50,
    fontWeight: '500',
    color: COLORS.black,
    textShadowColor: 'black',
    textShadowRadius: 3,
    textAlign: 'center',
  },
  instructions: {
    marginBottom: 20,
    fontSize: 24,
    fontWeight: '400',
    color: COLORS.black,
    padding: 10,
    textAlign: 'center',
    //textShadowColor: 'black',
    //textShadowRadius: 2,
  },
  hit: {
    alignSelf:'center',
    bottom:26,
    fontSize: 15,
    fontWeight: '400',
    color: COLORS.green,
    left:20,
    textAlign: 'center',
  },
  customBtnText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: '500',
    color: COLORS.white,
    width: 200,

    padding: 10
  },
  smiley: {
    bottom: 50,
    right:80,
    alignSelf: 'center',
    backgroundColor:'rgb(255, 255, 26)',
    borderRadius:20,
   
  }
  ,
  customBtnBG: {
    backgroundColor: COLORS.green,
    paddingHorizontal: 5,
    paddingVertical: 5,
    width: 200,
    borderRadius: 30,
    marginBottom: 70,
  },
  bins: {
    borderRadius: 20 * 2,
    width: 100 * 2,
    height: 200 * 2,
  }
});
export default Start;