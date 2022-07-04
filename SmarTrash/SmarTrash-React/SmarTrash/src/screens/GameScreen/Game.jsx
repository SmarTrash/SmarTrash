import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, View, Modal, Pressable } from 'react-native';
import { Text,NativeBaseProvider,} from 'native-base';
import { GlobalContext } from '../../../GlobalContext/GlobalContext'
import { GameEngine } from "react-native-game-engine";
import { OurItem, Bin, Timer, Floor } from "../../screens/renderers";
import { MoveItem, Collision } from "../../screens/systems";
import COLORS from '../../Consts/colors';
import { Audio } from 'expo-av';
// import Constants from './../Constants';
// import { Octicons } from '@expo/vector-icons';
import Constants from '../../screens/Constants';
const WIDTH = Constants.WIDTH;
const HEIGHT = Constants.HEIGHT;


const Game = ({ navigation }) => {

  const { userImg, userEmail, userFirstName, userState, setUserState, userLastName
  } = useContext(GlobalContext);
  const [engine, setEngine] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  let iconURL = userImg;
  // soundState = "sound";
  // soundObject = new Audio.Sound();

  useEffect(() => {
    setUserState({
      running: true,
      points: 0,
      username: userFirstName + " " + userLastName,
      userEmail: userEmail,
      visibleModal: true,
      item: "can" //random
    })
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: false,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
      shouldDuckAndroid: true,
      staysActiveInBackground: false,
      playThroughEarpieceAndroid: true,
    });

    // try {
    //   soundObject.loadAsync(require('./assets/gamesound.mp3'));
    //   soundObject.playAsync();
    // } catch (error) {
    //   console.log(error);
    // }
    // return () => {

    //   try {
    //     soundObject.unloadAsync();
    //     soundObject.stopAsync();
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
  }, []);




  const storeData = async (points, username, userEmail) => {
    const v = [{
      points: points,
      username: username,
      userEmail: userEmail,
      icon: iconURL

    }];
    console.log('v', v);
    console.log('userEmail', userEmail);
    AsyncStorage.getItem('points', (err, result) => {
      if (result !== null) {
        //console.log('Data found', result);
        var arr = JSON.parse(result) || [];
        var newPoints = arr.concat(v);
        AsyncStorage.setItem('points', JSON.stringify(newPoints));
      }
      else {
        //console.log("data not found");
        AsyncStorage.setItem('points', JSON.stringify(v));
      }
    })
    AsyncStorage.clear();
  }

  // const toggleSound = () => {
  //   if (soundState === "sound") {
  //     soundState = "nosound";
  //     soundObject.pauseAsync();
  //   } else if (soundState === "nosound") {
  //     soundState = "sound";
  //     soundObject.playAsync();
  //   }
  // };

  const onEvent = (e) => {
    if (e.type == 'correct') {
      setUserState({
        ...userState,
        points: userState.points + 10
      })
    }
    if (e.type == 'wrong') {
      setUserState({
        ...userState,
        points: userState.points - 10
      });
    }
  }

  //game over
  const onChangeTimer = () => {
    setUserState({ ...userState, running: false });

  }

  const reset = () => {
    setUserState({
      ...userState,
      running: true,
      points: 0,
      userEmail: userEmail,
      updateTimer: userState.updateTimer + 1
    });
  }
  console.log('userState', userState);
  return (

    <NativeBaseProvider>
      <View style={styles.container}>
        <Text style={styles.score}>סה"כ נקודות</Text>
        <Text style={styles.points}>{userState.points}</Text>
        <Timer key={userState.updateTimer} onChange={() => onChangeTimer()} />
        {/* <Pressable onPress={toggleSound}>
          <Octicons style={styles.muteIcon} name={soundState === "sound" ? "unmute" : "mute"} size={24} color="black" />
        </Pressable> */}
        <GameEngine
          // ref={(ref) => { this.engine = ref; }}
          ref={(ref) => { setEngine(ref) }}
          style={styles.container}
          running={userState.running}
          onEvent={onEvent}
          systems={[MoveItem, Collision]}
          entities={{
            1: { position: [WIDTH / 2, HEIGHT - 200], item: userState.item, renderer: <OurItem /> },
            //bins
            2: { position: [WIDTH - 125, HEIGHT / 3], category: "paper", renderer: <Bin /> },
            3: { position: [WIDTH - 55, HEIGHT / 3], category: "glass", renderer: <Bin /> },
            4: { position: [WIDTH / 3.7, HEIGHT / 3], category: "organic", renderer: <Bin /> },
            5: { position: [WIDTH / 16, HEIGHT / 3], category: "plastic", renderer: <Bin /> },
            6: { position: [WIDTH / 2.1, HEIGHT / 3], category: "trash", renderer: <Bin /> },
            // Clouds
            7: { position: [WIDTH / 16, HEIGHT - 670], category: "cloud", renderer: <Bin /> },
            8: { position: [WIDTH / 16 - 100, HEIGHT - 650], category: "cloud", renderer: <Bin /> },
            9: { position: [WIDTH / 16 + 100, HEIGHT - 700], category: "cloud", renderer: <Bin /> },
            //10: {position: [WIDTH/16+100, HEIGHT-700], category: "mountain", renderer: <Bin/>},
            // Floor
            16: { position: [0, HEIGHT / 3 - 90], category: "floor", renderer: <Floor /> }

          }}>
         <StatusBar hidden={true} />
        </GameEngine>
        {!userState.running &&
          <Modal
            transparent={true}
            visible={userState.visibleModal}
            animationType="slide"
          >
            <View style={styles.centeredView}>
              <Modal
                animationType="slide"
                transparent={true}
                visible={userState.visibleModal}
                onRequestClose={() => {
                  Alert.alert("Modal has been closed.");
                  setModalVisible(!modalVisible);
                }}
              >
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                          <View style={styles.textView}>
                    <Pressable
                      style={[styles.button, styles.buttonClose]}
                      onPress={() => {
                        storeData(JSON.stringify(userState.points), userState.username);
                        { reset() }
                      }}>
                      <Text style={styles.textStyle}>משחק חוזר</Text>
                    
                    </Pressable>
                      </View>
                    <Pressable
                      style={[styles.button, styles.buttonClose]}
                      onPress={() => {
                        storeData(JSON.stringify(userState.points), userState.username, userState.userEmail);
                        console.log('userState.points:', userState.points);
                        navigation.navigate("GameOver")
                        setUserState({
                          userState,
                          visibleModal: false
                        })
                        console.log('userState', userState);
                      }
                      }>
                      <Text style={styles.textStyle}>לוח תוצאות</Text>
                    </Pressable>

                  </View>
                </View>
              </Modal>
            </View>
          </Modal>
        }
        <StatusBar style="auto" />
      </View>
    </NativeBaseProvider>

  );
}

export default Game;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: "#63CDDA"
  },
  score: {
    fontSize: 20,
    fontWeight: '400',
    marginRight: 25,
    marginTop:20,
    textAlign: "right",
    marginHorizontal: 10,
    color:COLORS.black,
    marginRight: 25,

  },
  points: {
    fontSize: 30,
    fontWeight: '400',
    padding: 15,
    textAlign: "right",
    marginHorizontal: 10,
    color:COLORS.black
  },
  modalView: {
    backgroundColor: "white",
    display: 'flex',
    flexDirection: 'row',
    height: HEIGHT * 0.3,
    marginTop: 200,
    width: WIDTH * 0.9,
    borderRadius: 20,
    alignSelf: 'center',
    alignContent: 'center'
  },
  modalButton: {
    paddingVertical: 50,
    alignSelf: 'center',    
  },
  muteIcon: {
    marginTop: 0,
    marginHorizontal: 20
  },
  ////
  textView:{
    margin:10

  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: COLORS.green,
  },
  buttonClose: {
    backgroundColor: COLORS.green,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }

});