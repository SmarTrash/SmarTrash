import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import LottieView from 'lottie-react-native';
const Start = ({navigation}) => {
    return(
    <View style = {styles.MainContainer}>
        <Text style={styles.title}>SmarTrash!</Text>
        <Text style={styles.instructions}>תנסה למיין כמה שיותר מוצרים בזמן המוקצב, אם טעיתה תפסיד נקודות </Text>
        <LottieView style={{width:10, aspectRatio:400/200, flexGrow:1,alignSelf:'center'}}
        resizeMode="center"
        source={require('../../../assets/Game.json')}
        autoPlay
       />
        <TouchableOpacity
          style={styles.customBtnBG}
          onPress={() => navigation.navigate('Game', {startAgain: false})}  >
          <Text style={styles.customBtnText}>START</Text>
        </TouchableOpacity>
    </View>
    );
  };

const styles = StyleSheet.create({
  MainContainer: {
    backgroundColor: '#B8E994',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    marginTop: 30,
    fontSize: 50,
    fontWeight: '400',
    color: "#fff",
    textShadowColor: 'black',
    textShadowRadius: 2,
  },
  instructions: {
    fontSize: 20,
    fontWeight: '400',
  
    color: "#fff",
    padding: 10,
    textAlign: 'center',
    //textShadowColor: 'black',
    //textShadowRadius: 2,
  },
  customBtnText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: '400',
   
    color: "#fff",
    width: 200,
  
    padding: 10
  },
  customBtnBG: {
    backgroundColor: "#78E08F",
    paddingHorizontal: 5,
    paddingVertical: 5,
    width: 200,
 
    borderRadius: 30,
    marginBottom:20,
  },
  bins: {
    borderRadius: 20 * 2,
    width: 100 * 2,
    height: 200 * 2,
  }
});
  export default Start;