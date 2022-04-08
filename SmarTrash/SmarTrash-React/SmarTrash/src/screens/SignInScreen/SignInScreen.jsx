import { View, StyleSheet, ScrollView, ImageBackground, Dimensions, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import bg from '../../../assets/bg.jpg'
import CustomInput from '../../Components/CustomInput/CustomInput'
import CustonButton from '../../Components/CustomButton/CustonButton'
import SocialSignInButtons from '../../Components/SocialSignInButtons/SocialSignInButtons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { CheckBox, ListItem } from 'react-native-elements'
import COLORS from '../../Consts/colors'

const apiUrl = 'http://proj.ruppin.ac.il/bgroup91/prod/api/SignIn';

const SignInScreen = ({ navigation }) => {

  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSelected, setSelection] = useState(true);
  const [IsUserExists, setIsUserExists] = useState(false);
  const newUser = {
    UserEmail: "",
    Password: ""
  };


  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      AsyncStorage.getItem('@storage_Key')

        .then(value => {
          if (value != null) {
            navigation.navigate('Home');
          }
        })
    } catch (error) {
      console.log(error);
    }
  }
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

  const onSignInPressed = () => {

    let reg = /[a-zA-Z0-9]+[a-zA-Z0-9]+[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;
    if (reg.test(userEmail) === true) {
      setUserEmail(userEmail);
    }
    else {
      alert(' כתובת אימייל  לא חוקית');
      setUserEmail(null)
    }
    if (password.length > 8) {
      setPassword(password)

    } else {
      alert(' סיסמה לא חוקית');
      setPassword(null)
    }
    if (password != null && userEmail != null) {
      newUser.UserEmail = userEmail;
      newUser.Password = password;
      fetch(apiUrl, {
        method: 'POST',
        body: JSON.stringify(newUser),
        headers: new Headers({
          'Content-type': 'application/json; charset=UTF-8',
          'Accept': 'application/json; charset-UTF-8'

        })
      }).then(response => { return response.json() })
        .then(data => {
     
          setIsUserExists(data.isSuccess)
          if (IsUserExists) {
              navigation.navigate('Home');
            console.log("hjhjhjhkljkj", isSelected)
            if (isSelected) {
              storeData(newUser)
            }
          } else {
            alert(data.message);
          }
        
        });


    }
  }
  const onForgotPasswordPressed = () => {
    navigation.navigate('ForgotPasswordScreen');
  }

  const onSignUpPressed = () => {
    navigation.navigate('SignUpScreen');
  }
  const onRememberMePressed = () => {
    console.warn("onRememberMePressed");
  }

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
            <TouchableOpacity onPress={onSignUpPressed}>
              <Text style={{ color: COLORS.green, fontStyle: 'italic', textAlign: 'center', fontSize: 18 }}
              > הירשם עכשיו!</Text>
            </TouchableOpacity>
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
              <View style={{ flex: 1, marginLeft: -70 }}>

                <ListItem noBorder>
                  <View style={styles.container}>
                    <View style={styles.checkboxContainer}>
                      <CheckBox
                        style={styles.checkbox}
                        value={isSelected}
                        onValueChange={setSelection}
                        color={isSelected ? COLORS.primary : undefined}
                      />
                      <Text style={{ color: '#8f9195', alignSelf: 'flex-start', marginLeft: 5 }}>Remember me</Text>
                    </View>
                  </View>
                </ListItem>

              </View>

              <View style={{ flex: 1, marginRight: -90 }}>
                <TouchableOpacity onPress={onForgotPasswordPressed}>
                  <ListItem noBorder>
                    <Text style={{ color: '#8f9195', alignSelf: 'flex-start', marginTop: -2 }}>Forgot Password</Text>
                  </ListItem>
                </TouchableOpacity>

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
  loginBtn: {
    alignSelf: 'center',
    backgroundColor: '#4632A1',
    width: Dimensions.get('window').width / 2,
    justifyContent: 'center'
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: "center",
    marginLeft: 30
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  }
})