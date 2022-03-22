import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useState } from 'react'
import useWindowDimensions from 'react-native/Libraries/Utilities/useWindowDimensions'
import CustomInput from '../../Components/CustomInput/CustomInput'
import CustonButton from '../../Components/CustomButton/CustonButton'
import SocialSignInButtons from '../../Components/SocialSignInButtons/SocialSignInButtons'

const SignUpScreen = () => {
  const [userEmail, setUserEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [password, setPassword] = useState('');
  const [streetNum, setStreetNum] = useState('');
  const [city, setCity] = useState('');

  const { height } = useWindowDimensions();

  const onSignUPPressed = () => {
    console.warn("Sign up");
  }

  const onSignInPressed = () => {
    console.warn("sign up");
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>Create an account</Text>

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

        <CustomInput
          placeholder="שם פרטי"
          value={firstName}
          setValue={setFirstName}
        />

        <CustomInput
          placeholder="שם משפחה"
          value={lastName}
          setValue={setLastName}
        />

        <CustomInput
          placeholder="מין"
          value={gender}
          setValue={setGender}
        />

        <CustomInput
          placeholder="תאריך לידה"
          value={birthDate}
          setValue={setBirthDate}
        />

        <CustomInput
          placeholder="טלפון"
          value={phone}
          setValue={setPhone}
        />

        <CustomInput
          placeholder="רחוב ומספר בית"
          value={streetNum}
          setValue={setStreetNum}
        />

        <CustomInput
          placeholder="עיר"
          value={city}
          setValue={setCity}
        />

        <CustonButton
          text="הרשמה"
          onPress={onSignUPPressed}
        />

        <SocialSignInButtons />
        <CustonButton
          text="Have an account? Sign In"
          onPress={onSignInPressed}
          type="TERTIARY"
        />
      </View>
    </ScrollView>
  )
}

export default SignUpScreen;
const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 20
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: "#051C60",
    margin: 10
  }

})