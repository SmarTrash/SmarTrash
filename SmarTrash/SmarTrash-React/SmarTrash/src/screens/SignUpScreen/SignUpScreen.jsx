import { View, Text, StyleSheet, ScrollView, SafeAreaView, Dimensions } from 'react-native'
import React, { useState } from 'react'
import CustomInput from '../../Components/CustomInput/CustomInput'
import CustonButton from '../../Components/CustomButton/CustonButton'
import SocialSignInButtons from '../../Components/SocialSignInButtons/SocialSignInButtons'
import DatePicker from 'react-native-datepicker';
import RadioForm from 'react-native-simple-radio-button';

const { width } = Dimensions.get('screen');
const cardWidth = width / 1.2;

const apiUrl = 'http://proj.ruppin.ac.il/bgroup91/prod/api/SignIn';

const SignUpScreen = ({ navigation }) => {
  const [userEmail, setUserEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [checked, setChecked] = useState('אישה');
  const [birthDate, setBirthDate] = useState('');
  const [password, setPassword] = useState('');
  const [streetNum, setStreetNum] = useState('');
  const [city, setCity] = useState('');


  const options = [
    { label: 'אישה', value: 'אישה' },
    { label: 'גבר', value: 'גבר' },
  ];
  const date = new Date();
  const d = `${date.getDate()}/${date.getMonth()}/${date.getFullYear() - 6}`;

  const newUser = {
    UserEmail: "",
    Password: "",
    FirstName : "",
    LastName : "",
    Phone: "",
    Gender : "",
    BirthDate : "",
    StreetNameAndNumber :"",
    CityId:"",
  };
  newUser.UserEmail=userEmail;
  newUser.FirstName = firstName;
  newUser.LastName = lastName;
  newUser.Phone = phone;
  newUser.Gender = checked;
  newUser.BirthDate = birthDate;
  newUser.Password =password;
  newUser.StreetNameAndNumber = streetNum;
  newUser.CityId = value.CityId;
  
  const onSignUPPressed = () => {
    fetch(apiUrl, {
      method: 'POST',
      body: JSON.stringify(newUser),
      headers: new Headers({
        'Content-type': 'application/json; charset=UTF-8'
      })
    }).then(response => { return response.json() })
      .then(data => {
        console.log("dataaaaaa:", data);
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

  const onSignInPressed = () => {
    console.warn("sign up");
    navigation.navigate('SignInScreen');
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



        <SafeAreaView style={styles.container}>
          <View style={styles.container}>
            <DatePicker
              style={styles.datePickerStyle}
              date={birthDate}
              mode="date" 
              placeholder="הכנס תאריך לידה"
              format="DD-MM-YYYY"
              maxDate={d}
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0,
                },
                dateInput: {
                  marginLeft: 36,
                },
              }}
              onDateChange={(date) => {
                setBirthDate(date);
              }}
            />
          </View>
        </SafeAreaView>

        <View >

          <RadioForm style={{ flexDirection: 'row', }}
            radio_props={options}
            initial={0}
            onPress={(value) => {
              setChecked(value);

            }}
          />
        </View>

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
  },
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 20,
  },
  datePickerStyle: {
    width: cardWidth,
    marginRight: 10
  },

})