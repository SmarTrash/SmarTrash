 import { View, Text, StyleSheet, Image } from 'react-native'
 import React from 'react'
import CustonButton from '../../Components/CustomButton/CustonButton';
 
 const BinPicture = ({route, navigation}) => {
    const getImageUrl = () => {
        if (route.params.binName == "פח כתום") {
            return  require("../../../Images/orange.jpg");
        } else if (route.params.binName == "פח סגול") {
            return require("../../../Images/purple.jpg");
        } else {
            console.log("defualt")
            return  require("../../../Images/orange.jpg");
        }
    }

    const img = getImageUrl();
    console.log("img")
    console.log(img)
   return (
     <View style={styles.container}>
       <View style={styles.header}>
       <Image
            source={img} />
                 <CustonButton
            text='חזרה לדף הבית'
            onPress={() => navigation.navigate('Home')} />
      </View>
     </View>
   )
 }
 
 export default BinPicture;     

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
      fontSize:20,
    },
  });