import { View, Image, StyleSheet, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import useWindowDimensions from 'react-native/Libraries/Utilities/useWindowDimensions'
import CustomInput from '../../Components/CustomInput/CustomInput'
import CustonButton from '../../Components/CustomButton/CustonButton'
import SocialSignInButtons from '../../Components/SocialSignInButtons/SocialSignInButtons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createIconSetFromFontello } from 'react-native-vector-icons'
import Homepage from '../HomePage/HomePage';
import validator from 'validator'



const SignInScreen = ({ navigation }) => {
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const { height } = useWindowDimensions();

  useEffect(() => {
    storeData();
  }, []);

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('@storage_Key', jsonValue)
      navigation.navigate('HomePage');
    } catch (e) {
      // saving error
    }
  }

  const onSignInPressed = async () => {

    let reg = /[a-zA-Z0-9]+[a-zA-Z0-9]+[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;
    if (reg.test(userEmail) === true) {
      setUserEmail(userEmail);

      await AsyncStorage.setItem('@storage_Key', JSON.stringify(userEmail));
    }
    else {
      alert(' כתובת אימייל  לא חוקית');
      setUserEmail(null)

    }
    if (password.length > 8) {
      setPassword(password)
      await AsyncStorage.setItem('@storage_Key', JSON.stringify(userEmail, password));
    } else {
      alert(' סיסמה לא חוקית');

      setPassword(null)
    }



  }




  const onForgotPasswordPressed = () => {
    console.warn("Forgot Password?");
  }

  const onSignUpPressed = () => {
    console.warn("sign up");
  }


  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Image source={logo} style={[styles.logo, { height: height * 0.3 }]} resizeMode="contain" />

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
        <CustonButton
          text="התחברות"
          onPress={onSignInPressed}
        />
        <CustonButton
          text="Forgot Password"
          onPress={onForgotPasswordPressed}
          type="TERTIARY"
        />

        <SocialSignInButtons />

        <CustonButton
          text="Don't have an account? Create one"
          onPress={onSignUpPressed}
          type="TERTIARY"
        />

      </View>
    </ScrollView>
  )
}
export default SignInScreen;
const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 20
  },
  logo: {
    width: '70%',
    maxWidth: 300,
    height: 200
  }

})