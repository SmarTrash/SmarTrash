import { StatusBar } from 'expo-status-bar';
import React, { PureComponent, useEffect,useContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, View, Dimensions, Alert, Modal, Pressable } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import {
  Container, Header, Content, Card, Input,
  CardItem, Text, Right, Icon, Row,
  Left, Body, Title, Button, Label, Form, Item
}
  from 'native-base';
  import { GlobalContext } from '../../../GlobalContext/GlobalContext'
import { GameEngine } from "react-native-game-engine";
import { OurItem, Bin, Timer, Floor } from "./../renderers";
import { MoveItem, Collision } from "./../systems";
import { Audio } from 'expo-av';
import { Octicons } from '@expo/vector-icons';
import Constants from './../Constants';
const WIDTH = Constants.WIDTH;
const HEIGHT = Constants.HEIGHT;
let iconURL = ['https://www.shareicon.net/data/128x128/2015/08/17/86679_cat_256x256.png', 'https://www.shareicon.net/data/128x128/2015/08/17/86680_cat_256x256.png', 'https://www.shareicon.net/data/128x128/2015/08/17/86684_cat_256x256.png', 'https://www.shareicon.net/data/128x128/2015/04/04/17581_cat_128x128.png', 'https://www.shareicon.net/data/128x128/2015/04/04/17584_animal_128x128.png', 'https://www.shareicon.net/data/128x128/2015/04/04/17589_animal_128x128.png', 'https://www.shareicon.net/data/128x128/2015/04/04/17590_animal_128x128.png', 'https://www.shareicon.net/data/128x128/2015/04/04/17586_animal_128x128.png'];


const Game = ( {navigation}) => {
 
  const {userEmail, userState, setUserState
  } = useContext(GlobalContext);
  engine = null;

  soundState = "sound";
  soundObject = new Audio.Sound();

  useEffect(() => {

    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: false,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
      shouldDuckAndroid: true,
      staysActiveInBackground: false,
      playThroughEarpieceAndroid: true,
    });

    try {
       soundObject.loadAsync(require('../../../assets/gamesound.mp3'));
       soundObject.playAsync();
    } catch (error) {
      console.log(error);
    }
    return () => {

      try {
        soundObject.unloadAsync();
        soundObject.stopAsync();
      } catch (error) {
        console.log(error);
      }
    }
  }, []);




const  storeData = async (points, username) => {
    const v = [{
      points: points,
      username: username,
      icon: iconURL[[Math.floor(Math.random() * iconURL.length)]]
    }];
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
  }

 const  toggleSound = () => {
    // if (this.soundState === "sound") {
    //   soundState = "nosound";
    //   soundObject.pauseAsync();
    // } else if (this.soundState === "nosound") {
    //   soundState = "sound";
    //   soundObject.playAsync();
    // }
  };

 const  onEvent = (e) => {
    if (e.type == 'correct') {
      setUserState({...userState,
        points: userState.points + 10
      })
    }
    if (e.type == 'wrong') {
      setUserState({...userState,
        points: userState.points - 10
      });
    }
  }

  //game over
 const onChangeTimer = () => {
    setUserState({...userState, running: false });

  }

 const reset = () => {
    setUserState({...userState,
      running: true,
      points: 0,
      updateTimer:userState.updateTimer + 1
    });
  }

 const renderModalContent=()=>{
   
        <View style={styles.modalView}>
          <Form>
            <Item stackedLabel>
              <Label>Insert a username to save your score!</Label>
              <Input
                value={userState.username}
                onChangeText={(text) => {
                  setUserState({ username: text })
                }}
              />
            </Item>
            <Button rounded success
              style={styles.modalButton}
              onPress={() => {
                storeData(JSON.stringify(userState.points), userState.username);
                // this.reset()

              }}>
              <Text>Play again</Text>
            </Button>
            <Button rounded warningcreateth
              style={styles.modalButton}
              title="View Leaderboard"
              onPress={() => {
                storeData(JSON.stringify(userState.points), userState.username);
                navigation.navigate("GameOver")
                setUserState({...userState,
                  visibleModal: false
                })
              }
              }>
              <Text>View Leaderboard</Text>
            </Button>
          </Form>

        </View>
  }

 
    return (
      
      <NativeBaseProvider>
        <View style={styles.container}>
          <Text style={styles.score}>Score</Text>
          <Text style={styles.points}>{userState.points}</Text>
          <Timer key={userState.updateTimer} onChange={()=>onChangeTimer()} />
          <Pressable onPress={toggleSound}>
            <Octicons style={styles.muteIcon} name={soundState === "sound" ? "unmute" : "mute"} size={24} color="black" />
          </Pressable>
          <GameEngine
            // ref={(ref) => { this.engine = ref; }}
            ref={(ref) => { }}
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
             {renderModalContent()}
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
    margin: 20,
    textAlign: "right",
    marginHorizontal: 10

  },
  points: {
    fontSize: 30,
    fontWeight: '400',
    padding: 15,
    textAlign: "right",
    marginHorizontal: 10
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
    alignSelf: 'center'
  },
  muteIcon: {
    marginTop: 0,
    marginHorizontal: 20
  }

});