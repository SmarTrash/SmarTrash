// import { View, Dimensions, StyleSheet, Alert } from 'react-native'
// import React, { useContext, useState, useEffect } from 'react'
// import Camera from '../../Components/Camera/useCamera'
// import CustonButton from '../../Components/CustomButton/CustonButton'
// import { GlobalContext } from '../../../GlobalContext/GlobalContext';
// import { useNavigation } from '@react-navigation/native';
// import { AntDesign } from '@expo/vector-icons';
// import COLORS from '../../Consts/colors'
// import CameraScreen from '../CameraScreen/CameraScreen';

// // Utils
// import { ChangeImage } from '../../Utils/CameraUtils';

// const { width } = Dimensions.get('screen');
// const { height } = Dimensions.get('screen');
// const cardWidth = width;
// const cardHeight = height ;
// let urlUpdateImage = "http://proj.ruppin.ac.il/bgroup91/prod/api/HomePage/uploadpicture/";


// const IdentifyImage = () => {

// const [newUserImage, setNewUserImage] = useState('');
// useEffect(() => {
//   ChangeImage();
// });

//     // const { userImg } = useContext(GlobalContext);

//   const uploadImage = () => {
//     console.log("pressed")
//     // imageUpload(userImg, 'userPicture.jpg')
//   }
//   imageUpload = (userImage, picName) => {

//     let urlAPI = "http://proj.ruppin.ac.il/bgroup91/prod/api/HomePage/uploadpicture";
//     let dataI = new FormData();

//     dataI.append('picture', {
//       uri: userImage,
//       name: picName,
//       type: 'image/jpg'
//     });

//     const config = {
//       method: 'POST',
//       body: dataI,
//     }
//     console.log("config=", config)
//     // console.log("userImg=", userImg)
    
//     fetch(urlAPI, config)
//       .then((res) => {
//         console.log({res});
//        return res.json() 
//         // else { return "err"; }
//       })
//       .then((responseData) => {
//         console.log("responseData=", responseData)
//         if (responseData != "err") {
//           console.log("img uploaded successfully!"); 
//           setNewUserImage(responseData);
          

//         }
//         else { alert('error uploding ...'); }
//       })
//       .catch(err => { alert('err upload= ' + err); });
//   }
//   return (
//     <View>
//       <View style={styles.root}>
//            <Camera />
//         <View style={styles.savePic}>
//           <CustonButton
//             text='שמירה'
//             onPress={uploadImage} />
//         </View>
//       </View>


//     </View>
//   )
// }

// export default IdentifyImage



// const styles = StyleSheet.create({
//     header: {
//       marginTop: 60,
//       flexDirection: 'row',
//       alignItems: 'center',
//       marginHorizontal: 20,
//       justifyContent: 'space-between',
//     },
//     root: {
//       alignItems: 'center',
//       backgroundColor: 'white',
//       width: cardWidth,
//       height: cardHeight,
//     },
//     savePic: {
//       bottom: 30,
//     }
  
//   })