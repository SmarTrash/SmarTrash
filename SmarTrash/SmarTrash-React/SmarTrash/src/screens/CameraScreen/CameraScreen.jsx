import { View, Dimensions, StyleSheet, Alert } from 'react-native'
import React, { useContext } from 'react'
import Camera from '../../Components/Camera/useCamera'
import CustonButton from '../../Components/CustomButton/CustonButton'
import { GlobalContext } from '../../../GlobalContext/GlobalContext';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('screen');
const { height } = Dimensions.get('screen');
const cardWidth = width;
const cardHeight = height;

const CameraScreen = () => {

  const navigation = useNavigation();
  const { userImg, userEmail,userFirstName,userLastName,setOpen,setShow } = useContext(GlobalContext);

  const uploadImage = () => {
    console.log("pressed")
    imageUpload(userImg, 'userPicture.jpg')
  }
  console.log("userImg=", userImg)
  imageUpload = (userImage, picName) => {

    let urlAPI = "http://proj.ruppin.ac.il/bgroup91/prod/api/HomePage/uploadpicture";
    let dataI = new FormData();

    dataI.append('picture', {
      uri: userImage,
      name: picName,
      type: 'image/jpg'
    });

    const config = {
      method: 'POST',
      body: dataI,
    }
    console.log("config=", config)
    console.log("userEmail=", userEmail)

    const ifPressOK =() => {
      setShow(true)
      setOpen(true)
      navigation.navigate("EditProfile")
  }  
  

    fetch(urlAPI, config, {
      method: 'POST',
      body: JSON.stringify({ UserEmail: userEmail }),
      headers: new Headers({
        'Content-type': 'application/json; charset=UTF-8',
        'Accept': 'application/json; charset-UTF-8'
      })
    }).then((res) => {
      if (res.status == 201) { return res.json() }
      else { return "err"; }
    })
      .then((responseData) => {
        console.log("responseData=", responseData)
        if (responseData != "+err") {
          let picNameWOExt = picName.substring(0, picName.indexOf("."));
          let imageNameWithGUID = responseData.substring(responseData.indexOf(picNameWOExt),
            responseData.indexOf(".jpg") + 4);
          console.log({ imageNameWithGUID });
          console.log("img uploaded successfully!");
          
          Alert.alert(
            userFirstName +" "+ userLastName,
            "התמונה שונתה בהצלחה",
            [ 
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "OK", onPress: () => ifPressOK() }
            ]
          );
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

export default CameraScreen

const styles = StyleSheet.create({
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