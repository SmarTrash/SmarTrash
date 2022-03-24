import { View, Text, ScrollView, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import CustomInput from '../../Components/CustomInput/CustomInput'
import CustonButton from '../../Components/CustomButton/CustonButton'

const ResetPassword = ({ navigation }) => {
  const [userEmail, setUserEmail] = useState('');
  const onSendPressed = () => {
    navigation.navigate('ResetPassword');
  }

  const onSignInPressed = () => {
    navigation.navigate('SignInScreen');
  }
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>

        <Text style={styles.title}>Reset your Password</Text>

        <CustomInput
          placeholder="אימות קוד "
          value={userEmail}
          setValue={setUserEmail}
        />
        <CustomInput
          placeholder="סיסמה חדשה"
          value={userEmail}
          setValue={setUserEmail}
        />
        <CustonButton
          text="החלף סיסמה"
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

export default ResetPassword
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