import { View, Text, Button, Dimensions, StyleSheet } from 'react-native'
import React, { useContext } from 'react'
import Camera from '../../Components/Camera/useCamera'
import CustonButton from '../../Components/CustomButton/CustonButton'
import { GlobalContext } from '../../../GlobalContext/GlobalContext';

const { width } = Dimensions.get('screen');
const { height } = Dimensions.get('screen');
const cardWidth = width ;
const cardHeight = height;

const CameraScreen = () => {

  const { userImg } = useContext(GlobalContext);

  const uploadImage = () => {
    console.log("pressed")
    imageUpload(userImg,'userPicture.jpg')
  }
  const imageUpload = (userImg, picName) => {

    let urlAPI = 'http://proj.ruppin.ac.il/bgroup91/prod/api/HomePage/uploadpicture';
    let dataI = new FormData();

    dataI.append('picture', {
      uri: userImg,
      name: picName,
      type: 'image/jpg'
    });

    const config = {
      method: 'POST',
      body: dataI,
    }
    
    fetch(urlAPI, config)
      .then((res) => { 
        if (res.status == 201) { return res.json(),console.log("res.status= ",res.status) ;}
        else { return "err"; }
      })
      .then((responseData) => {
        console.log("responseData= ",responseData)
        if (responseData != "err") {
          let picNameWOExt = picName.substring(0, picName.indexOf("."));
          let imageNameWithGUID = responseData.substring(responseData.indexOf(picNameWOExt),
            responseData.indexOf(".jpg") + 4);
          console.log("\n img uploaded successfully!");
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
