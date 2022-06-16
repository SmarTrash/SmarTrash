import { View, Dimensions, StyleSheet, Alert } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import Camera from '../../Components/Camera/useCamera'
import CustonButton from '../../Components/CustomButton/CustonButton'
import { GlobalContext } from '../../../GlobalContext/GlobalContext';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import COLORS from '../../Consts/colors'

// Utils
import { ChangeImage, sendToAzure } from '../../Utils/CameraUtils';

const { width } = Dimensions.get('screen');
const { height } = Dimensions.get('screen');
const cardWidth = width;
const cardHeight = height ;
let urlUpdateImage = "http://proj.ruppin.ac.il/bgroup91/prod/api/HomePage/uploadpicture/";
const CameraScreen = () => {



  const navigation = useNavigation();
  const { userImg,setUserImg, userEmail, userFirstName, userLastName, setOpen, setShow,userGallery,setUserGallery } = useContext(GlobalContext);

  const [newUserImage, setNewUserImage] = useState('');
  useEffect(() => {
    ChangeImage(newUserImage, userEmail);
  });

  const uploadImage = () => {
    imageUpload(userImg, 'userPicture.jpg')
  }
  console.log("userImg=", userImg)
 const imageUpload = (userImage, picName) => {

    let urlAPI = "http://proj.ruppin.ac.il/bgroup91/prod/api/HomePage/uploadpicture";

    let dataI = new FormData();

    dataI.append('picture', {
      uri: userImage,
      name: picName,
      type: 'image/jpg'
    });
console.log({dataI});
    const config = {
      method: 'POST',
      body: dataI,
    }
    console.log("config=", config)
    console.log("userEmail=", userEmail)

    const ifPressOK = () => {
      setShow(true)
      setOpen(true)
      navigation.navigate("EditProfile")

    }


    fetch(urlAPI, config)
      .then((res) => {
        console.log({res});
       return res.json() 
        // else { return "err"; }
      })
      .then((responseData) => {
        console.log("responseData=", responseData)
        if (responseData != "err") {
          console.log("img uploaded successfully!");
          console.log("responseData")
          console.log(responseData)
          


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
      
        // }
         
          
          


          setNewUserImage(responseData);
          ChangeImage(responseData, userEmail);

        }
        else { alert('error uploding ...'); }
      })
      .catch(err => { alert('err upload= ' + err); });
  }

//  body  , query  , params 
  // const ChangeImage = (newUserImage) => {
  //   console.log("userImg", userImg);
  //   console.log("url", newUserImage);
  //   fetch(urlUpdateImage, {
  //     method: 'POST',
  //      body: JSON.stringify({ UserEmail: userEmail,
  //                             UserImg: newUserImage}),
  //     headers: new Headers({
  //       'Content-type': 'application/json; charset=UTF-8',
  //       'Accept': 'application/json; charset-UTF-8'
  //     })
  //   }).then((res) => {
  //     if (res.status == 201) {
  //       Alert.alert(
  //         userFirstName + " " + userLastName,
  //         "התמונה שונתה בהצלחה",
  //         [
  //           {
  //             text: "Cancel",
  //             onPress: () => console.log("Cancel Pressed"),
  //             style: "cancel"
  //           },
  //           { text: "OK", onPress: () => ifPressOK() }
  //         ]
  //       );
  //     }
  //     else { return "err"; }
  //   })

  // }
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