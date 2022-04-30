import { View, StyleSheet, ScrollView, ImageBackground, Dimensions, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import bg from '../../../assets/bg.jpg'
import CustomInput from '../../Components/CustomInput/CustomInput'
import CustonButton from '../../Components/CustomButton/CustonButton'
import SocialSignInButtons from '../../Components/SocialSignInButtons/SocialSignInButtons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ListItem } from 'react-native-elements'
import COLORS from '../../Consts/colors'
import { GlobalContext } from '../../../GlobalContext/GlobalContext'
import Checkbox from 'react-native-bouncy-checkbox'

const apiUrl = 'http://proj.ruppin.ac.il/bgroup91/prod/api/HomePage/HomePageDetails';

const SignInScreen = ({ navigation }) => {

  const { userEmail, setUserEmail,
    checked, setChecked,
    setUserFirstName,
    setUserLastName,
    setUserCompetitionPlace,
    setUserLastThrow,
    setUserPoints,
    setUserGender,
    setUserPhone,
    setUserBirthDate,
    setUserCityId,
    setUserStreetNameAndNumber,
    setUserImg,userImg,
    password, setPassword } = useContext(GlobalContext);


  


  useEffect(() => {
    //getData()
  }, []);

  // const getData = async () => {
  //   try {
  //     AsyncStorage.getItem('@storage_Key')
     
  //       .then(value => { console.log(value);
  //         if (value != null) {
  //           navigation.navigate('Home');
  //         }
  //       })
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      console.log("dataaaaaa:", value);
      await AsyncStorage.setItem('@storage_Key', jsonValue)
      navigation.navigate('Home');
    } catch (e) {
      console.log(e);
    }
  }
  const newUser = {
    UserEmail:userEmail,
    Password: password,
    Img: "",
    Checked:"",
    First:"",
    Last:"",
    CompetitionPlace:"",
    LastThrow: "",
    Points:"",
  };
  const onSignInPressed = () => {

    if (password != null && userEmail != null) {
      newUser.UserEmail = userEmail;
      newUser.Password = password;
      console.log("11111111111",newUser);
      fetch(apiUrl, {
        method: 'POST',
        body: JSON.stringify(newUser),
        headers: new Headers({
          'Content-type': 'application/json; charset=UTF-8',
          'Accept': 'application/json; charset-UTF-8'

        })
      }).then(response => { return response.json() })
        .then(data => {
          console.log("2222222222",data);

          if (data.isSuccess) {
            console.log("333",data.message);
            alert(data.message);

          } else {
            console.log("4444444",data);
              setUserFirstName(data[0].First),
              setUserLastName(data[0].Last),
              setUserCompetitionPlace(data[0].competitionPlace),
              setUserLastThrow(data[0].lastThrow),
              setUserPoints(data[0].Points),
              setUserGender(data[0].gender),
              setUserPhone(data[0].phone),
              setUserBirthDate(data[0].birthDate),
              setUserCityId(data[0].cityId),
              setUserStreetNameAndNumber(data[0].streetNum),
              setUserImg(data[0].Img)
              console.log("5555",data[0].phone);
              console.log("checked:", checked)
            // if (checked) {
            //  newUser.Img= userImg,
            //  newUser.Checked=checked,
            //  newUser.First=userFirstName,
            //  newUser.Last=userLastName,
            //  newUser.CompetitionPlace=userCompetitionPlace,
            //  newUser.LastThrow= userLastThrow,
            //  newUser.Points=userPoints,
            //   console.log("newUser:", newUser)
            //   storeData(newUser)  
             
            // }
           navigation.navigate('Home')
          
          }

        });
    } else {
      alert("אנא מלא את שם המשתמש והסיסמא");

    }   // let reg = /[a-zA-Z0-9]+[a-zA-Z0-9]+[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;
    // if (reg.test(userEmail) === true) {
    //   setUserEmail(userEmail);
    // }
    // else {
    //   alert(' כתובת אימייל  לא חוקית');
    //   setUserEmail(null)
    // }
    // if (password.length > 8) {
    //   setPassword(password)
    //
    // } else {
    //   alert(' סיסמה לא חוקית');
    //   setPassword(null)
    // }
  }
  // const removeData = async () => {
  //   try {
  //     await AsyncStorage.removeItem('@storage_Key');
  //     { console.log("@storage_Key:", AsyncStorage) }
  //     navigation.navigate('SignInScreen');
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }




  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.root}>

      <ImageBackground source={bg} style={styles.logo} >

        <View style={styles.brandView}>

          <Text style={styles.brandViewText}>SmarTrash</Text>
        </View>

      </ImageBackground>
      <View style={styles.bottomView} >
        <View style={{ padding: 40 }}>

          <Text style={{ color: 'black', fontSize: 34, fontWeight: 'bold', textAlign: 'center' }}>ברוכים הבאים</Text>
          <Text style={{ fontSize: 18, textAlign: 'center' }}>אין לך חשבון?

            <Text onPress={() => navigation.navigate('SignUpScreen')} style={{ color: COLORS.green, fontStyle: 'italic', textAlign: 'justify', fontSize: 18 }}
            > הירשם עכשיו!</Text>

          </Text>

          <View style={{ marginTop: 30 }}>
            <CustomInput
              placeholder="אימייל"
              value={userEmail}
              setValue={setUserEmail}
              icon="email"
            />
            <CustomInput
              placeholder="סיסמה"
              value={password}
              setValue={setPassword}
              secureTextEntry={true}
            />

            <View style={styles.forgetPassView}>
              <View style={{ flex: 1 }}>
                <TouchableOpacity onPress={() => navigation.navigate('ForgotPasswordScreen')}>
                  <ListItem noBorder>
                    <Text style={{ color: '#8f9195', marginTop: 0 }}>Forgot Password</Text>
                  </ListItem>
                </TouchableOpacity>

              </View>

              <View style={{ flex: 1 }}>

                <ListItem noBorder>
                  <View style={styles.container}>

                    <View>
                      <Text style={{ color: '#8f9195', marginRight: 50, marginTop: -50, marginTop: 0 }}>Remember me</Text>
                      <Checkbox
                        style={{ marginLeft: 140, marginTop: -23 }}
                        status={checked ? 'checked' : 'unchecked'}
                        onPress={() => {
                          setChecked(!checked);
                        }}
                        fillColor={COLORS.primary}
                      />
                      {console.log("isSelected:", checked)}
                    </View>
                  </View>
                </ListItem>

              </View>


            </View>



            <View
              style={{
                height: 100,
                justifyContent: 'center',
                alignItems: 'center'
              }}>
              <CustonButton
                text="התחברות"
                onPress={onSignInPressed}
              />
              <View style={{ flex: 1 }}>
                <Text style={{ textAlign: 'center', fontSize: 16 }}>or Login With</Text>

              </View>

            </View>
            <SocialSignInButtons />
          </View>
        </View>
      </View>
    </ScrollView >

  )
}
export default SignInScreen;
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  logo: {
    height: Dimensions.get('window').height / 2.5
  },
  icon: {
    color: '#ffffff',
    fontSize: 100
  },
  brandView: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center'
  },
  brandViewText: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#ffffff',
    textTransform: 'uppercase'
  },
  bottomView: {
    flex: 1.5,
    backgroundColor: '#ffffff',
    bottom: 50,
    borderTopStartRadius: 60,
    borderTopEndRadius: 60
  },
  forgetPassView: {
    height: 50,
    marginTop: 0,
    flexDirection: 'row'
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  loginBtn: {
    alignSelf: 'center',
    backgroundColor: '#4632A1',
    width: Dimensions.get('window').width / 2,
    justifyContent: 'center'
  },


  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  }
}) 