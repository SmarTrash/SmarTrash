import { GlobalContext } from '../../../GlobalContext/GlobalContext'
import React, { useState,useContext, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Leaderboard from 'react-native-leaderboard';
import Constants from '../Constants';
import COLORS from '../../Consts/colors'
const WIDTH = Constants.WIDTH;
const HEIGHT = Constants.HEIGHT;


const GameOver = ({route, navigation}) => {
  const { userState, setUserState
  } = useContext(GlobalContext);
  const [points, setPoints] = useState([{}]);
  const [position, setPosition] = useState(1);
  let img = require('../../../assets/trophy.png')
 
  const getData = async () => {
    AsyncStorage.getItem('points', (err,result) => {
      if (result !== null) {
        //console.log('Data found', result);
        setPoints(JSON.parse(result).sort((a,b) => b.points - a.points))

      }
})
  }
  const simulateSlowNetworkRequest = () =>
  new Promise(resolve => setTimeout(resolve, 1000));


  useEffect(() => {
    let isMounted = true;
    simulateSlowNetworkRequest().then(() => {
      if (isMounted==true) {
        getData();
        setPosition(points
      .findIndex(elem => elem.points == userState.points && elem.username==userState.username)+1);
        }  
    })
    
    return () => {
        isMounted = false;
      }
    });

return(
  <View style={styles.container}>
    <View style={styles.header}> 
      <Text style={styles.title}>לוח תוצאות</Text>
      <View style={styles.content}>
        <Text style={styles.points}
         > שבור את השיא של עצמך והרווח נקודות{'\n'} </Text> 
        <Image source={img} style={styles.image}></Image>
    </View>
    <TouchableOpacity
      style={styles.customBtnBG}
        onPress={() => navigation.navigate('Start')}>
          <Text style={styles.customBtnText}>חזור למשחק</Text>
      </TouchableOpacity>

    </View>
  <Leaderboard 
  data={points} 
  labelBy='username'
  sortBy='points'
  //sort = {data =>data.sort((a,b) => b.points - a.points)} 
  icon='icon'
  evenRowColor='gainsboro'
  containerStyle={styles.leaderboard}
  />
  </View>
)}


  
const styles = StyleSheet.create({
  container: {
    flex:1
  },
  header: {
    backgroundColor: COLORS.green,
    height: HEIGHT * 0.3,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    color: 'white',
    marginTop: 10
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent:'space-evenly'
  },
  image: {
    height: 50,
    width: 50,
  },
  points: {
    color: 'white',
    fontSize: 15,
    paddingHorizontal: 10
  },
  customBtnText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: '400',
    fontFamily: 'Thonburi-Bold',
    color: COLORS.white,
    width: 200,
    marginTop: 0
  },
  customBtnBG: {
    backgroundColor: "#78E08F",
    paddingHorizontal: 5,
    paddingVertical: 5,
    width: 200,
    marginTop: 0,
    borderRadius: 5,
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  }
});
   
  export default GameOver;