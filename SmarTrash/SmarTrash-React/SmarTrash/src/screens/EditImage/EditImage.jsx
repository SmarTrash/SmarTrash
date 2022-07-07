import { SafeAreaView, StyleSheet, TouchableOpacity, Alert, ColorPropType } from 'react-native'
import React, { useRef, useContext, useState } from 'react'
import ActionSheet from 'react-native-actionsheet';
import COLORS from '../../Consts/colors';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { GlobalContext } from '../../../GlobalContext/GlobalContext';
import * as ImagePicker from 'expo-image-picker';
let urlUpdateImage = "http://proj.ruppin.ac.il/bgroup91/prod/api/HomePage/updateUserImage";
let urlAPI = "http://proj.ruppin.ac.il/bgroup91/prod/api/HomePage/uploadpicture";

const EditImage = () => {
  const {setUserImg, userEmail} = useContext(GlobalContext);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  let actionSheet = useRef();
  let optionArray = ['מצלמה', 'גלריה', 'יציאה'];

  const showActionSheet = () => {actionSheet.current.show();}

  btnOpenGalery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
    });
    if (!result.cancelled) {
      setUserImg(result.uri);
      uploadImage(result.uri)
    }
  };

  const updateData = async (u) => {
    AsyncStorage.getItem('@storage_Key')
      .then(data => {
        data = JSON.parse(data);
        console.log(data);
        data.Img = u;
        AsyncStorage.setItem('@storage_Key', JSON.stringify(data));
      }).done();
  }

  const uploadImage = (us) => {
    imageUpload(us, 'userPicture.jpg')
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

   
    fetch(urlAPI, config)
      .then((res) => {return res.json() })
      .then((responseData) => {
        console.log("responseData=", responseData)
        if (responseData != "err" || responseData != null) {
          console.log("img uploaded successfully!");
          setUserImg(responseData)
          ChangeImage(responseData);
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
    updateData(u);
  }

  return (
    <SafeAreaView>
      
      <TouchableOpacity onPress={showActionSheet} style={styles.sortBtn}>
        <MaterialCommunityIcons name="circle-edit-outline" size={23} color={COLORS.secondary} />
      </TouchableOpacity>
      <ActionSheet
        ref={actionSheet}
        title={'תמונה באמצעות'}
        titleColor={'black'}
        options={optionArray}
        cancelButtonIndex={2}
        destructiveButtonIndex={1}
        tintColor={COLORS.green}
        onPress={(index) => {
          if (optionArray[index] == 'מצלמה') {
            navigation.navigate('CameraScreen')
          }
          else if (optionArray[index] == 'גלריה') {
            
            btnOpenGalery()
          }
          else if (optionArray[index] == 'יציאה') {
            navigation.navigate('EditProfile')
          }
        }}
      />
    </SafeAreaView>
  )
}

export default EditImage;

const styles = StyleSheet.create({
  sortBtn: {
    marginTop: 40,
    marginRight: 15,
    marginLeft: 7,
    height: 30,
    width: 30,
    backgroundColor: COLORS.green,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },
});