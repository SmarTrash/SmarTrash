import { View, Text, ScrollView, StyleSheet, Keyboard } from 'react-native'
import React, { useContext } from 'react'
import CustomInput from '../../Components/CustomInput/CustomInput'
import CustonButton from '../../Components/CustomButton/CustonButton'
import { GlobalContext } from '../../../GlobalContext/GlobalContext'
import Loader from '../../Components/Loader/Loader';
const apiUrl = 'http://proj.ruppin.ac.il/bgroup91/prod/api/SendMail';

const ForgotPasswordScreen = ({ navigation }) => {
  const [inputs, setInputs] = React.useState({
    email: '',

  });
  const [loading, setLoading] = React.useState(false);
  const { userEmail, setUserEmail } = useContext(GlobalContext);
  const [errors, setErrors] = React.useState({});
  const onSendPressed = () => {
    setUserEmail(inputs.email)
    console.log('userEmail',inputs.email);
    setLoading(true);
    setTimeout(() => {
      try {
        setLoading(false);
        
        console.log("user before sending", userEmail);
        fetch(apiUrl, {
          method: 'POST',
          body: JSON.stringify({ UserEmail: inputs.email }),
          headers: new Headers({
            'Content-type': 'application/json; charset=UTF-8',
            'Accept': 'application/json; charset-UTF-8'
          })
        }).then(response => { return response.json() })
          .then(data => {
            if (data.isSuccess == true) {
              navigation.navigate('SignInScreen');
            }
          });
      } catch (error) {
        Alert.alert('Error', 'Something went wrong');
      }
    }, 7000);
  }
  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;

    if (!inputs.email) {
      handleError('בבקשה הכנס אימייל', 'email');
      isValid = false;
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      handleError('בבקשה הכנס אימייל תקין', 'email');
      isValid = false;
    }

    if (isValid) {
      onSendPressed();
    }
  };
  const onSignInPressed = () => {
    navigation.navigate('SignInScreen');
  }
  const handleOnchange = (text, input) => {
    setInputs(prevState => ({ ...prevState, [input]: text }));
  };
  const handleError = (error, input) => {
    setErrors(prevState => ({ ...prevState, [input]: error }));
  };
  return (


    <View style={styles.root}>
      <Loader visible={loading} />
      <Text style={styles.title}>שחזור סיסמה</Text>
      <View style={{ marginVertical: 20 }}>
        <CustomInput
          onChangeText={text => handleOnchange(text, 'email')}
          onFocus={() => handleError(null, 'email')}
          iconName="email"
          label="אימייל"
          defaultValue={inputs.email}
          placeholder="אימייל"
          error={errors.email}
        />

        <CustonButton
          text="שלח"
          onPress={validate}
        />
      </View>
      <CustonButton
        text="Back to Sign in"
        onPress={onSignInPressed}
        type="TERTIARY"
      />

    </View>

  )
}

export default ForgotPasswordScreen

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 50,

  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: "#051C60",
    margin: 10
  }

})