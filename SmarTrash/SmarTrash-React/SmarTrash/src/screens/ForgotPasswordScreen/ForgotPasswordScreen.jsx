import { View, Text, ScrollView,StyleSheet } from 'react-native'
import React, { useState } from 'react'
import CustomInput from '../../Components/CustomInput/CustomInput'
import CustonButton from '../../Components/CustomButton/CustonButton'

const ForgotPasswordScreen = () => {

  const [userEmail, setUserEmail] = useState('');

  const onSendPressed = () => {
    console.warn("Send");
  }

  const onSignInPressed = () => {
    console.warn("sign in");
  }
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>

        <Text style={styles.title}>Reset your Password</Text>

        <CustomInput
          placeholder="אימייל"
          value={userEmail}
          setValue={setUserEmail}
        />

        <CustonButton
          text="שלח"
          onPress={onSendPressed}
        />

        <CustonButton
          text="Back to Sign in"
          onPress={onSignInPressed}
          type="TERTIARY"
        />
      </View>
    </ScrollView>
  )
}

export default ForgotPasswordScreen

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