import { View, Dimensions, StyleSheet, Alert } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import Camera from '../../Components/Camera/useCamera'
import CustonButton from '../../Components/CustomButton/CustonButton'
import { GlobalContext } from '../../../GlobalContext/GlobalContext';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'

// Utils
import { sendToAzure } from '../../Utils/CameraUtils';

const { width } = Dimensions.get('screen');
const { height } = Dimensions.get('screen');
const cardWidth = width;
const cardHeight = height;

let urlAPI = "http://proj.ruppin.ac.il/bgroup91/prod/api/HomePage/uploadpicture";

const BinCameraScreen = () => {

  const navigation = useNavigation();
  const { userImg } = useContext(GlobalContext);

  // const updateData = async (u) => {
  //   AsyncStorage.getItem('@storage_Key')
  //     .then(data => {

  //       // the string value read from AsyncStorage has been assigned to data
  //       console.log("eeeeeeeeeeeeeeeeeeeeee",data);

  //       // transform it back to an object
  //       data = JSON.parse(data);
  //       console.log(data);

  //       // Decrement
  //       data.Img=userImg;
  //       console.log("hhhhhhhhhhhh" ,data );

  //       //save the value to AsyncStorage again
  //       AsyncStorage.setItem('@storage_Key', JSON.stringify(data));

  //     }).done();


  // }

  // useEffect(() => {

  // },[userImg]);

  // console.log("userImguserImg", userImg);
  const uploadImage = () => {
    imageUpload(userImg, 'userPicture.jpg')
  }

  const imageUpload = (userImage, picName) => {

    let dataI = new FormData();
    console.log({ picName });
    dataI.append('picture', {
      uri: userImage,
      name: picName,
      type: 'image/jpg'
    });

    console.log('dataI', dataI);

    const config = {
      method: 'POST',
      body: dataI,
    }
    console.log("config=", config)

    fetch(urlAPI, config)
      .then((res) => {
        console.log({ res });
        return res.json()
        // else { return "err"; }
      })
      .then((responseData) => {
        console.log("responseData=", responseData)
        if (responseData != "err" || responseData != null || !responseData) {
          console.log("img uploaded successfully!");
          // setUserImg(responseData)

          // if (responseData.indexOf("http") == 0)
          // {
          console.log("sending")
          sendToAzure(responseData)
            .then(type => {
              console.log("type in component")
              console.log(type)
              navigation.navigate("BinPicture", { binName: type })
              alert(type);

            })
            .catch(err => {
              console.log("err in component")
              console.log(err)
            })

          // }

        }
        else { alert('error uploding ...'); }


      })
      .catch(err => { alert('err upload= ' + err); });
  }



  return (
    <View>
      <View style={styles.root}>
        <Camera />
        <View style={styles.savePic}>
          <CustonButton
            text='שמירה'
            onPress={uploadImage} />
        </View>
      </View>


    </View>

  )
}

export default BinCameraScreen

const styles = StyleSheet.create({
  header: {
    marginTop: 60,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    justifyContent: 'space-between',
  },
  root: {
    alignItems: 'center',
    backgroundColor: 'white',
    width: cardWidth,
    height: cardHeight,
  },
  savePic: {
    bottom: 30,
  }

})