import { View, Text, Image, StyleSheet, ScrollView } from 'react-native'
import React, { useState } from 'react'
import logo from '../../../assets/images/logo.jpg'
import useWindowDimensions from 'react-native/Libraries/Utilities/useWindowDimensions'
import CustomInput from '../../Components/CustomInput'
import CustonButton from '../../Components/CustomButton/CustonButton'

export default function SignInPage() {
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const { height } = useWindowDimensions();

  const onSignInPressed = () => {
    console.warn("Sign in");
  }

  const onForgotPasswordPressed = () => {
    console.warn("Forgot Password?");
  }

  const onSignInFacebookPressed = () => {
    console.warn("facebook");
  }

  const onSignInGooglePressed = () => {
    console.warn("google");
  }

  const onSignUpPressed = () => {
    console.warn("sign up");
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Image source={logo} style={[styles.logo, { height: height * 0.3 }]} resizeMode="contain" />

        <CustomInput placeholder="מייל" value={userEmail} setValue={setUserEmail} />
        <CustomInput placeholder="סיסמה" value={password} setValue={setPassword} secureTextEntry={true} />
        <CustonButton text="הרשמה" onPress={onSignInPressed} />
        <CustonButton text="Forgot Password" onPress={onForgotPasswordPressed} type="TERTIARY" />

        <CustonButton
          text="Sign in with Facebook"
          onPress={onSignInFacebookPressed}
          bgColor="#E7EAF4"
          fgColor="#4765A9"
        />
        <CustonButton
          text="Sign in with Google"
          onPress={onSignInGooglePressed}
          bgColor="#E7EAF4"
          fgColor="#DD4D44"
        />
        <CustonButton
          text="Don't have an account? Create one"
          onPress={onSignUpPressed}
          type="TERTIARY"
        />
      </View>
    </ScrollView>
  )
}

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