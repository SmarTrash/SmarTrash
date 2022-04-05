import { View, Text, ScrollView,StyleSheet } from 'react-native'
import React, { useState } from 'react'
import CustomInput from '../../Components/CustomInput/CustomInput'
import CustonButton from '../../Components/CustomButton/CustonButton'

const apiUrl = 'http://proj.ruppin.ac.il/bgroup91/prod/api/SendMail';
const ForgotPasswordScreen = ({navigation}) => {

  const [userEmail, setUserEmail] = useState('');


  const onSendPressed = () => {
    alert('הסיסמה נשלחה אליך למייל');
    fetch(apiUrl, {
      method: 'POST',
      body: JSON.stringify(userEmail),
      headers: new Headers({
        'Content-type': 'application/json; charset=UTF-8',
        'Accept': 'application/json; charset-UTF-8'

      })
    }).then(response => { return response.json(),console.log("res:",response.status)  })
      .then(data => {
         console.log("data:",data.tatus)
        // if (IsUserExists) {
        //   navigation.navigate('SignInScreen');
          
        // }
       
      });


  }

  const onSignInPressed = () => {
    navigation.navigate('SignInScreen');
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