// import { View, Text,Dimensions, StyleSheet, TouchableOpacity, BottomSheetModal, Alert } from 'react-native'
// import React, { useEffect,useContext } from 'react'
// import { useNavigation } from '@react-navigation/native';
// import { GlobalContext } from '../../../GlobalContext/GlobalContext';
// import * as ImagePicker from 'expo-image-picker';
// import AsyncStorage from '@react-native-async-storage/async-storage'
// import {  MaterialIcons } from '@expo/vector-icons';
// import COLORS from '../../Consts/colors';

// const { width } = Dimensions.get('screen');
// const { height } = Dimensions.get('screen');
// // const cardWidth = width / 1;
// // const cardHeight = height / 1;

// let urlUpdateImage = "http://proj.ruppin.ac.il/bgroup91/prod/api/HomePage/updateUserImage";
// let urlAPI = "http://proj.ruppin.ac.il/bgroup91/prod/api/HomePage/uploadpicture";

// const Gallery = () => {

//     // const bottomSheetHeight = Dimensions.get('window').height * 0.25;
//     // const deviceWidth = Dimensions.get('window').width;
//     const {userImg,setUserImg, userEmail,userFirstName,userLastName } = useContext(GlobalContext);
//     const navigation = useNavigation();



//      btnOpenGalery = async () => {
//         let result = await ImagePicker.launchImageLibraryAsync({
//         //allowsEditing: true,
//         //aspect: [4, 3], 
        
//     });
//     setUserImg(result)
  
//         if (!result.cancelled) {
//          setUserImg(result.uri );
//          uploadImage(result.uri )
//         }
//         };
        
//       console.log('image',userImg);
    
//   const updateData = async (u) => {
//     AsyncStorage.getItem('@storage_Key')
//       .then(data => {

//         // the string value read from AsyncStorage has been assigned to data
//         console.log("eeeeeeeeeeeeeeeeeeeeee",data);

//         // transform it back to an object
//         data = JSON.parse(data);
//         console.log(data);

//         // Decrement
//         data.Img=u;
//         console.log("hhhhhhhhhhhh" ,data );

//         //save the value to AsyncStorage again
//         AsyncStorage.setItem('@storage_Key', JSON.stringify(data));

//       }).done();


//   }


//   console.log("userImguserImg", userImg);
//   const uploadImage = (us) => {
//     imageUpload(us, 'userPicture.jpg')
//   }

//   const imageUpload = (userImage, picName) => {

//     let dataI = new FormData();

//     dataI.append('picture', {
//       uri: userImage,
//       name: picName,
//       type: 'image/jpg'
//     });

//     console.log('dataI', { dataI });

//     const config = {
//       method: 'POST',
//       body: dataI,
//     }
//     console.log("config=", config)

//     fetch(urlAPI, config)
//       .then((res) => {
//         console.log({ res });
//         return res.json()
//         // else { return "err"; }
//       })
//       .then((responseData) => {
//         console.log("responseData=", responseData)
//         if (responseData != "err" || responseData != null) {
//           console.log("img uploaded successfully!");
//           setUserImg(responseData)
//           ChangeImage(responseData);
//           // }

//         }
//         else { alert('error uploding ...'); }


//       })
//       .catch(err => { alert('err upload= ' + err); });
//   }


//   const ChangeImage = (u) => {

//     console.log("userImghhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh", u);
//     fetch(urlUpdateImage, {
//       method: 'POST',
//       body: JSON.stringify({
//         UserEmail: userEmail,
//         UserImg: u
//       }),
//       headers: new Headers({
//         'Content-type': 'application/json; charset=UTF-8',
//         'Accept': 'application/json; charset-UTF-8'
//       })
//     })

//         Alert.alert(
//           userFirstName + " " + userLastName,
//           "התמונה שונתה בהצלחה",
//           [
//             {
//               text: "Cancel",
//               onPress: () => console.log("Cancel Pressed"),
//               style: "cancel"
//             },
//             { text: "OK", onPress: () => { 
//               navigation.navigate("EditProfile")}
//           , style: "ok" }
//           ]
//         );
//         updateData(u);
//        }
   
//   return (
//     <View>
//       <Text>Gallery</Text>
//       <TouchableOpacity onPress={() => {
//                     btnOpenGalery()
//                     console.log("pressedGallery")
                   
//                 }}>
//                     <MaterialIcons name="photo-library" size={99} color={COLORS.primary} />
//                     <Text >גלריה</Text>
//                 </TouchableOpacity>
//     </View>
//   )
// }

// export default Gallery