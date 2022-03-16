import { View, Image, StyleSheet, ScrollView } from 'react-native'
import React, { useState } from 'react'
import logo from '../../../assets/images/logo.jpg'
import useWindowDimensions from 'react-native/Libraries/Utilities/useWindowDimensions'
import CustomInput from '../../Components/CustomInput'
import CustonButton from '../../Components/CustomButton/CustonButton'
import SocialSignInButtons from '../SocialSignInButtons/SocialSignInButtons'

const SignInScreen = () => {
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const { height } = useWindowDimensions();

  const onSignInPressed = () => {
    console.warn("Sign in");
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