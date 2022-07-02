import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import COLORS from '../../Consts/colors';
import CustonButton from '../../Components/CustomButton/CustonButton';

const Start = ({navigation}) => {
    return(
    <View style = {styles.MainContainer}>
        <Text style={styles.title}>יאללה בואו נשחק!</Text>
        <Text style={styles.instructions}>תנסה למיין כמה שיותר מוצרים בזמן המוקצב, תזהר אם תטעה תפסיד נקודות </Text>
        <Image source={require('../../../assets/bins-start.png')} key='bins' style={[styles.bins]}/>
        {/* <TouchableOpacity
          style={styles.customBtnBG}
          onPress={() => navigation.navigate('Game', {startAgain: false})}  >
          <Text style={styles.customBtnText}>התחל</Text>
        </TouchableOpacity> */}
        <CustonButton
          text='התחל'
          onPress={() => navigation.navigate('Game', {startAgain: false})}  
         
        />
    </View>
    );
  };

const styles = StyleSheet.create({
  MainContainer: {
    backgroundColor: COLORS.offwhite,
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 60,
    fontWeight: '400',
    color: COLORS.white,
    textShadowColor: 'black',
    textShadowRadius: 3,
    textAlign:'center',
  },
  instructions: {
    fontSize: 24,
    fontWeight: '400',
    color: COLORS.green,
    padding: 10,
    textAlign: 'center',
    //textShadowColor: 'black',
    //textShadowRadius: 2,
  },
  customBtnText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: '400',
   
    color: COLORS.white,
    width: 200,
    marginTop: 0,
    padding: 10
  },
  customBtnBG: {
    backgroundColor: COLORS.green,
    paddingHorizontal: 5,
    paddingVertical: 5,
    width: 200,
    marginTop: 0,
    borderRadius: 30,
    alignItems:'center',
    
  },
  bins: {
    borderRadius: 20 * 2,
    width: 100 * 2,
    height: 200 * 2,
  }
});
  export default Start;