import { View, Dimensions, StyleSheet, Alert } from 'react-native'
import React, { useContext, useState } from 'react'
import Camera from '../../Components/Camera/useCamera'
import CustonButton from '../../Components/CustomButton/CustonButton'
import { GlobalContext } from '../../../GlobalContext/GlobalContext';
import { useNavigation } from '@react-navigation/native';
import Loader from '../../Components/Loader/Loader';
import { sendToAzure } from '../../Utils/CameraUtils';

const { width } = Dimensions.get('screen');
const { height } = Dimensions.get('screen');
const cardWidth = width;
const cardHeight = height;

let urlAPI = "http://proj.ruppin.ac.il/bgroup91/prod/api/HomePage/ImageFindBin";

const BinCameraScreen = () => {
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();
  const { imageBin, setSendFromBin } = useContext(GlobalContext);

  setSendFromBin(true)
  const uploadImage = () => {
    imageUpload(imageBin, 'userPicture.jpg')
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
    setLoading(true);
    
      try {
        
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
                  setLoading(false);
                  
                  navigation.navigate("BinPicture", { binName: type })
                  // alert(type);

    try {

      fetch(urlAPI, config)
        .then((res) => {
          return res.json()
        })
        .then((responseData) => {
          console.log("responseData=", responseData)
          if (responseData != "err" || responseData != null || !responseData) {
            console.log("img uploaded successfully!");
            sendToAzure(responseData)
              .then(type => {
                setLoading(false);
                navigation.navigate("BinPicture", { binName: type });
              })
              .catch(err => {
                console.log("err in component")
                console.log(err)
              })
          }
          else { alert('error uploding ...'); }
        })
        .catch(err => { alert('העלאת התמונה נכשלה, נסה שנית'); });
    } catch (error) {
      Alert.alert('Error', 'Something went wrong');
    }
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

export default BinCameraScreen

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    backgroundColor: 'white',
    width: cardWidth,
    height: cardHeight,
  },

})