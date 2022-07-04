import { SafeAreaView, StyleSheet, TouchableOpacity, Alert, ColorPropType } from 'react-native'
import React, { useRef, useContext } from 'react'
import ActionSheet from 'react-native-actionsheet';
import COLORS from '../../Consts/colors';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { GlobalContext } from '../../../GlobalContext/GlobalContext';
import * as ImagePicker from 'expo-image-picker';
let urlUpdateImage = "http://proj.ruppin.ac.il/bgroup91/prod/api/HomePage/updateUserImage";
let urlAPI = "http://proj.ruppin.ac.il/bgroup91/prod/api/HomePage/uploadpicture";

const EditImage = () => {
  const { userImg, setUserImg, userEmail, userFirstName, userLastName } = useContext(GlobalContext);

  const navigation = useNavigation();

  let actionSheet = useRef();
  let optionArray = [
    'מצלמה', 'גלריה', 'יציאה'
  ];
  const showActionSheet = () => {
    actionSheet.current.show();
  }

  btnOpenGalery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      //allowsEditing: true,
      //aspect: [4, 3], 

    });
    console.log('!!!!!!',result );

    if (!result.cancelled) {
      setUserImg(result.uri);
      uploadImage(result.uri)
    }
  };


  const updateData = async (u) => {
    AsyncStorage.getItem('@storage_Key')
      .then(data => {

        // the string value read from AsyncStorage has been assigned to data
        console.log("eeeeeeeeeeeeeeeeeeeeee", data);

        // transform it back to an object
        data = JSON.parse(data);
        console.log(data);

        // Decrement
        data.Img = u;
        console.log("hhhhhhhhhhhh", data);

        //save the value to AsyncStorage again
        AsyncStorage.setItem('@storage_Key', JSON.stringify(data));

      }).done();
  }

  // console.log("userImguserImg", userImg);
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
          ChangeImage(responseData);


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
        {
          text: "OK", onPress: () => {
            navigation.navigate("EditProfile")
          }
          , style: "ok"
        }
      ]
    );
    updateData(u);
  }

  return (
    <SafeAreaView>
      <TouchableOpacity style={{ backgroundColor: 'green' }} onPress={showActionSheet}>
        <MaterialCommunityIcons name="circle-edit-outline" size={20} color='white' style={{ marginTop: 2, marginLeft: 2 }} />
      </TouchableOpacity>
      <ActionSheet
        ref={actionSheet}
        title={'תמונה באמצעות'}
        titleColor={'black'}
        options={optionArray}
        cancelButtonIndex={2}
        destructiveButtonIndex={1}
        tintColor ={COLORS.green}
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
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 16,
    margin: 20,
    fontSize: 20,
    color: COLORS.green,
  },

});