import { View, Text, ScrollView,StyleSheet } from 'react-native'
import React, { useContext } from 'react'
import CustomInput from '../../Components/CustomInput/CustomInput'
import CustonButton from '../../Components/CustomButton/CustonButton'
import { GlobalContext } from '../../../GlobalContext/GlobalContext'
const apiUrl = 'http://proj.ruppin.ac.il/bgroup91/prod/api/SendMail';

const ForgotPasswordScreen = ({navigation}) => {
  const { userEmail, setUserEmail } = useContext(GlobalContext);

  const onSendPressed = () => {
     console.log("user before sending", userEmail);
    fetch(apiUrl, {
      method: 'POST',
      body: JSON.stringify({UserEmail:userEmail}),
      headers: new Headers({
        'Content-type': 'application/json; charset=UTF-8',
        'Accept': 'application/json; charset-UTF-8'
      })
    }).then(response =>  { return response.json()  })
      .then(data => {
         console.log("data:",data)
        if (data.isSuccess==true) {
          navigation.navigate('SignInScreen');
          alert(data.message);
        }
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