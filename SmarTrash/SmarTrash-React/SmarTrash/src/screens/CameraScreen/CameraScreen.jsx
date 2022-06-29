import { View, Dimensions, StyleSheet, Alert } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import Camera from '../../Components/Camera/useCamera'
import CustonButton from '../../Components/CustomButton/CustonButton'
import { GlobalContext } from '../../../GlobalContext/GlobalContext';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'

// Utils
import { ChangeImage, sendToAzure } from '../../Utils/CameraUtils';

const { width } = Dimensions.get('screen');
const { height } = Dimensions.get('screen');
const cardWidth = width;
const cardHeight = height;

let urlUpdateImage = "http://proj.ruppin.ac.il/bgroup91/prod/api/HomePage/updateUserImage";
let urlAPI = "http://proj.ruppin.ac.il/bgroup91/prod/api/HomePage/uploadpicture";

const CameraScreen = () => {

  const navigation = useNavigation();
  const { userImg, setUserImg, userEmail, userFirstName, userLastName, setOpen, setShow, userGallery, setUserGallery } = useContext(GlobalContext);

  const updateData = async (u) => {
    AsyncStorage.getItem('@storage_Key')
      .then(data => {

        // the string value read from AsyncStorage has been assigned to data
        console.log("eeeeeeeeeeeeeeeeeeeeee",data);

        // transform it back to an object
        data = JSON.parse(data);
        console.log(data);

        // Decrement
        data.Img=userImg;
        console.log("hhhhhhhhhhhh" ,data );

        //save the value to AsyncStorage again
        AsyncStorage.setItem('@storage_Key', JSON.stringify(data));

      }).done();


  }

  // useEffect(() => {

  // },[userImg]);

  console.log("userImguserImg", userImg);
  const uploadImage = () => {
    imageUpload(userImg, 'userPicture.jpg')
  }

  const imageUpload = (userImage, picName) => {

    let dataI = new FormData();

    dataI.append('picture', {
      uri: userImage,
      name: picName,
      type: 'image/jpg'
    });

    console.log('dataI', { dataI });

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
        if (responseData != "err" || responseData != null) {
          console.log("img uploaded successfully!");
          setUserImg(responseData)

          // if (responseData.indexOf("http") == 0)
          // {
          console.log("sending")
          sendToAzure("https://static.turbosquid.com/Preview/001235/567/ZD/plastic-water-bottle-3D-model_Z.jpg")
            .then(type => {
              console.log("type in component")
              console.log(type)
            })
            .catch(err => {
              console.log("err in component")
              console.log(err)
            })
          ChangeImage(responseData);
          // }

        }
        else { alert('error uploding ...'); }


      })
      .catch(err => { alert('err upload= ' + err); });
  }


  const ChangeImage = (u) => {

    console.log("userImghhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh", u);
    fetch(urlUpdateImage, {
      method: 'POST',
      body: JSON.stringify({
        UserEmail: userEmail,
        UserImg: u
      }),
      headers: new Headers({
        'Content-type': 'application/json; charset=UTF-8',
        'Accept': 'application/json; charset-UTF-8'
      })
    })

        Alert.alert(
          userFirstName + " " + userLastName,
          "התמונה שונתה בהצלחה",
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
            },
            { text: "OK", onPress: () => { setShow(false)
              setOpen(false) 
              navigation.navigate("EditProfile")}
          , style: "ok" }
          ]
        );
        updateData(u);
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

export default CameraScreen

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