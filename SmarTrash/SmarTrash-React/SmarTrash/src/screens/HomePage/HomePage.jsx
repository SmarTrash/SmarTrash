import { View, Text } from 'react-native'
import React, { useEffect,useState } from 'react'
const Homepage = () => {
  useEffect(() => {
    getData();
}, []);

const getData = async () => {
  try {
  const jsonValue = await AsyncStorage.getItem('@storage_Key')
  return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch(e) {
  // error reading value
  }
  }
  
// const [name, setName] = useState('');
// const getData = () => {
//     try {
//         AsyncStorage.getItem('UserData')
//             .then(value => {
//                 if (value != null) {
//                     let user = JSON.parse(value);
//                     setName(userEmail.Name);
//                 }
//             })
//     } catch (error) {
//         console.log(error);
//     }
// }
// const updateData = async () => {  
//   let reg =/[a-zA-Z0-9]+[a-zA-Z0-9]+[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;
//   console.log('userEmail:',userEmail)
//   if (reg.test(userEmail) === true){
//    setUserEmail(userEmail);
//    console.log('valid:',userEmail)
//    await AsyncStorage.mergeItem('UserData', JSON.stringify(userEmail));
//    navigation.navigate('SignUpScreen');
//   }
//   else{ 
//     console.log('email:',userEmail)
//     alert('כתובת אימייל לא חוקית');
//   }
  
// }
// const removeData = async () => {
//   try {
//       await AsyncStorage.removeItem('name');
//       navigation.navigate('SignInScreen');
//   } catch (error) {
//       console.log(error);
//   }
// }
  return (
    <View>
      <Text>Homepage</Text>
    </View>
  )
}

export default Homepage