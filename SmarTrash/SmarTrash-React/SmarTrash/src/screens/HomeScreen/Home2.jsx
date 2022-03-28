import { View, StyleSheet,Image,Text,Dimensions, } from 'react-native';
import React from 'react'
import COLORS from '../../consts/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { Ionicons, MaterialCommunityIcons, SimpleLineIcons, FontAwesome, Feather, AntDesign, FontAwesome5, MaterialIcons } from '@expo/vector-icons';

const width = Dimensions.get('screen').width/3-10;

export default function Home2() {
//   useEffect(() => {
//     getData();
// }, []);

// const getData = async () => {
//   try {
//   const jsonValue = await AsyncStorage.getItem('@storage_Key')
//   return jsonValue != null ? JSON.parse(jsonValue) : null;
//   } catch(e) {
//   // error reading value
//   }
//   }
  
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
    <SafeAreaView style={style.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={style.titleBar}>
          <SimpleLineIcons name="logout" size={24} color='#52575D'/>
          <Ionicons name="notifications-outline" size={24} color='#52575D' />
        </View>
            
        <View style={{alignSelf:'center'}}>
          <View style={style.profileImage}>
             <Image 
              style={style.image}
              source={{uri:'https://www.thehandbook.com/cdn-cgi/image/width=300,height=300,fit=cover,q=85/https://files.thehandbook.com/uploads/2019/12/22708923_288175598347572_5346731196820750336_n.jpg'}}/>
          </View>
          <View style={style.edit}>
            <MaterialCommunityIcons name="circle-edit-outline" size={20} color='#E5EFC1' style={{marginTop:2, marginLeft:2}} />
          </View>
        </View>

        <View style={style.infoContainer}>
          <MaterialCommunityIcons style={style.editInfoIcon} name="account-edit" size={24} color="#52575D" />
          <Text style={[style.text, {fontWeight:'200', fontSize:30,}]}>מאיה ורטיימר</Text>       
        </View>

        <View style={style.statusContainer}>
          <View style={style.statusBox}>
            <Text style={[style.text, {fontSize:24, }]}>60</Text>
            <Text style={[style.text, style.subText]}>צבירה אחרונה</Text>
          </View>
          <View style={[style.statusBox, {borderColor:'#DFD8C8', borderLeftWidth:1, borderRightWidth:1}]}>
            <Text style={[style.text, {fontSize:24, }]}>5000</Text>
            <Text style={[style.text, style.subText]}>סה"כ נקודות</Text>
          </View>
          <View style={style.statusBox}>
            <Text style={[style.text, {fontSize:24, }]}>3</Text>
            <Text style={[style.text, style.subText]}>מקומך בתחרות</Text>
          </View>
        </View>

        <View style={style.btnContainer}>
          <View>
            <View style={[style.sortBtn , {backgroundColor:'#557B83'}]}>
              <FontAwesome name="trash" size={60} color="black" />
            </View> 
            <View>
              <Text style={[style.text, style.subText,{marginLeft:27}]}>לאן לזרוק</Text>
            </View>
          </View>
          <View>
            <View style={[style.sortBtn , {backgroundColor:'#39AEA9'}]}>
              <Feather name="map-pin" size={60} color="black" />
            </View> 
            <View>
              <Text style={[style.text, style.subText, {marginLeft:22}]}>חיפוש פחים</Text>
            </View>
          </View>
          <View>
            <View style={[style.sortBtn , {backgroundColor:'#A2D5AB'}]}>
              <AntDesign name="play" size={60} color="black" />
            </View> 
            <View>
              <Text style={[style.text, style.subText, {marginLeft:37}]}>שחק</Text>
            </View>
          </View>
          <View>
            <View style={[style.sortBtn , {backgroundColor:'#E5EFC1'}]}>
              <FontAwesome5 name="recycle" size={60} color="black" />
            </View> 
            <View>
              <Text style={[style.text, style.subText, {marginLeft:22}]}>מחזר ותרוויח</Text>
            </View>
          </View>     
        </View>

        <View style={{marginTop:20, flexDirection:'row'}}>
            <View style={[style.card, {marginLeft:5}]}>
              <View style={{height:120, alignItems:'center'}}>
                <Image 
                style={style.cardImage}
                source={{uri:'https://www.ikea.com/global/assets/navigation/images/decorative-accessories-24924.jpeg?imwidth=300'}}/>
              </View>
              <Text style={style.giftText}>
                IKEA
              </Text>
              <Text style={[style.text, {textAlign:'center'}]}>
                1+1 במחלקת הנוי
              </Text>
              <View style={style.priceGift}>
              <MaterialIcons name="stars" size={24} color="#EEC373" />
              <Text style={[style.text, {textAlign:'center'}]}>1800</Text>
              </View>
            </View>
            <View style={style.card}>
              <View style={{height:120, alignItems:'center'}}>
                <Image 
                style={style.cardImage}
                source={{uri:'https://logodix.com/logo/1208469.png'}}/>
              </View>
              <Text style={style.giftText}>
                NIKE
              </Text>
              <Text  style={[style.text, {textAlign:'center'}]}>
                100 ש"ח מתנה 
              </Text>
              <View style={style.priceGift}>
              <MaterialIcons name="stars" size={24} color="#EEC373" />
              <Text style={[style.text, {textAlign:'center'}]}>2000</Text>
              </View>
            </View>
            <View style={style.card}>
              <View style={{height:120, alignItems:'center'}}>
                <Image 
                style={style.cardImage}
                source={{uri:'https://www.yamitspark.co.il/files/gallery/Copy_of_yam5.jpg'}}/>
              </View>
              <Text style={style.giftText}>
                ימית 2000
              </Text>
              <Text  style={[style.text, {textAlign:'center'}]}>
                כניסה חינם לילד
              </Text>
              <View style={style.priceGift}>
              <MaterialIcons name="stars" size={24} color="#EEC373" />
              <Text style={[style.text, {textAlign:'center'}]}>3200</Text>
              </View>
            </View>
        </View>

        </ScrollView>
    </SafeAreaView>
  )
}
const style = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:COLORS.white,
      justifyContent:'center',
    },
    titleBar:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:10,
        marginHorizontal:15,
        marginBottom:10,
    },
    profileImage:{
        width:200,
        height:200,
        borderRadius:100,
        overflow:'hidden',
    },
    image:{
        flex:1,
        width:undefined,
        height: undefined,
    },
    edit:{
        backgroundColor:'#557B83',
        position:'absolute',
        bottom:0,
        right:0,
        width:35,
        height:35,
        borderRadius:30,
        alignItems:'center',
        justifyContent:'center',
    },
    infoContainer:{
        flexDirection:'row',
        alignSelf:'center',
        alignItems:'center',
        marginTop:16,    
    },
    text: {
        fontFamily:'HelveticaNeue',
        color:'#52575D',
      },
    editInfoIcon:{
          marginRight:10,
      },
    statusContainer:{
        flexDirection:'row',
        alignSelf:'center',
        marginTop:32,
    },
    statusBox:{
        alignItems:'center',
        flex:1,
    },
    subText:{
        fontSize:12,
        color:'#AEB5BC',
    },
    btnContainer:{
        flexDirection:'row',
    },
    sortBtn:{
        marginTop:30,
        marginRight:12,
        marginLeft:10,
        height:80,
        width:80,
        justifyContent:'center',
        alignItems:'center',
        borderRadius: 20,
      },
    card:{
        height:250,
        backgroundColor:COLORS.light,
        borderRadius:10,
        marginBottom:20,
        padding:15,
        width,
        marginLeft:10,
      },
      giftText:{
        fontFamily:'HelveticaNeue',
        color:'#52575D', 
        fontSize:17, 
        marginTop:5,
        textAlign:'center', 
    },
    cardImage:{
      marginTop:0,
      height:150,
      width:120,
      borderRadius:10,
      flex:1,
    },
    priceGift:{
      flexDirection:'row-reverse',
    },
});