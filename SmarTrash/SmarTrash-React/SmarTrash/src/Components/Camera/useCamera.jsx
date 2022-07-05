import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Camera } from 'expo-camera';
import { GlobalContext } from '../../../GlobalContext/GlobalContext';
import COLORS from '../../Consts/colors';
import Loader from '../../Components/Loader/Loader';

const useCamera = () => {

    const { setUserImg, userImg,setImageBin,sendFromBin,setSendFromBin } = useContext(GlobalContext);
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [camera, setCamera] = useState(null);
    const [picUri, setPicUri] = useState(userImg);
    const [loading, setLoading] = useState(false);


    if(sendFromBin){
            setImageBin(picUri)
        console.log("sendFromBin",sendFromBin); 
    }else{
        
    setUserImg(picUri);
  }

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }
    return (
        <View style={styles.container}>
              <Loader visible={loading} />
            <Camera style={styles.camera} type={type} ref={ref => setCamera(ref)}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            setType(
                                type === Camera.Constants.Type.back
                                    ? Camera.Constants.Type.front
                                    : Camera.Constants.Type.back
                            );
                        }}>
                        <Text style={styles.text}>  החלף צד </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={async () => {
                            if (camera) {
                                const data = await camera.takePictureAsync(null);
                                setPicUri(data.uri);
                                setSendFromBin(false)
                            }
                        }}>
                        <View >
                            <Text style={styles.text}> צלם </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </Camera>
            <View style={{ flex: 0.6, justifyContent: 'center' }}>
                <Image
                    source={{ uri: picUri }}
                    style={styles.picture} />

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      <Loader visible={loading} />
      <Camera style={styles.camera} type={type} ref={ref => setCamera(ref)}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            <Text style={styles.text}>  החלף צד </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={async () => {
              if (camera) {
                const data = await camera.takePictureAsync(null);
                setPicUri(data.uri);
              }
            }}>
            <View >
              <Text style={styles.text}> צלם </Text>
            </View>
          </TouchableOpacity>
        </View>
      </Camera>
      <View style={{ flex: 0.6, justifyContent: 'center' }}>
        <Image
          source={{ uri: picUri }}
          style={styles.picture} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 0.7,
    width: 415,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20,
  },
  button: {
    flex: 0.2,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
  picture: {
    width: 200,
    bottom: 0,
    height: 200,
    borderWidth: 1,
    borderColor: COLORS.primary,
    margin: 10,
    alignSelf: 'center',
    borderRadius: 150,
  },
});

export default useCamera;