import { View, Dimensions, StyleSheet, Alert } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import Camera from '../../Components/Camera/useCamera'
import CustonButton from '../../Components/CustomButton/CustonButton'
import { GlobalContext } from '../../../GlobalContext/GlobalContext';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import Loader from '../../Components/Loader/Loader';

const { width } = Dimensions.get('screen');
const { height } = Dimensions.get('screen');
const cardWidth = width;
const cardHeight = height;

let urlUpdateImage = "http://proj.ruppin.ac.il/bgroup91/prod/api/HomePage/updateUserImage";
let urlAPI = "http://proj.ruppin.ac.il/bgroup91/prod/api/HomePage/uploadpicture";

const CameraScreen = () => {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const { userImg, setUserImg, userEmail, userFirstName, userLastName } = useContext(GlobalContext);

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

    const config = {
      method: 'POST',
      body: dataI,
    }
    setLoading(true)
    fetch(urlAPI, config)
      .then((res) => {
        return res.json()
      })
      .then((responseData) => {
        console.log("responseData=", responseData)
        if (responseData != "err" || responseData != null || !responseData) {
          console.log("img uploaded successfully!");
          setUserImg(responseData)
          ChangeImage(responseData);
          setLoading(false)
        }
        else { alert('error uploding ...'); }
      })
      .catch(err => { alert('העלאת התמונה נכשלה, נסה שנית'); });
  }


  const ChangeImage = (u) => {
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
        {
          text: "OK", onPress: () => {
            navigation.navigate("EditProfile")},
           style: "ok"
        }
      ]
    );
    updateData(u);
  }
  const updateData = async (u) => {
    AsyncStorage.getItem('@storage_Key')
      .then(data => {
        data = JSON.parse(data);
        data.Img = userImg;
        AsyncStorage.setItem('@storage_Key', JSON.stringify(data));
      }).done();
  }

  return (
    <View>
        <Loader visible={loading} />
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
    bottom: 60,
  }

})