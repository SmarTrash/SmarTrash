import { View, Text, StyleSheet, ScrollView, SafeAreaView, Dimensions } from 'react-native'
import React, { useEffect, useState,useContext } from 'react'
import CustomInput from '../../Components/CustomInput/CustomInput'
import CustonButton from '../../Components/CustomButton/CustonButton'
import SocialSignInButtons from '../../Components/SocialSignInButtons/SocialSignInButtons'
import DatePicker from 'react-native-datepicker';
import RadioForm from 'react-native-simple-radio-button';
import CityList from '../../Components/City/CityList'
import { GlobalContext } from '../../../GlobalContext/GlobalContext'



const { width } = Dimensions.get('screen');
const cardWidth = width / 1.2;

const apiUrl = 'http://proj.ruppin.ac.il/bgroup91/prod/api/Registration';

const SignUpScreen = ({ navigation }) => {
  
 const {setCities,cities,selectedCity} = useContext(GlobalContext);
  const [userEmail, setUserEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [checked, setChecked] = useState('F');
  const [birthDate, setBirthDate] = useState('');
  const [password, setPassword] = useState('');
  const [streetNum, setStreetNum] = useState('');
  // const [selectedCity, setSelectedCity] = useState(0);


  const options = [
    { label: '  נקבה', value: 'F' },
    { label: '  זכר', value: 'M' },
  ];
  const date = new Date();
  const d = '${date.getDate()}/${date.getMonth()}/${date.getFullYear() - 6}';

  // function handleChange(newValue) {
  //   setSelectedCity(newValue);
  // }

  const newUser = {
    UserEmail: "",
    Password: "",
    FirstName: "",
    LastName: "",
    Phone: "",
    Gender: "",
    BirthDate: "",
    StreetNameAndNumber: "",
    CityId: "",
    UserImg:""
  };
  newUser.UserEmail = userEmail;
  newUser.FirstName = firstName;
  newUser.LastName = lastName;
  newUser.Phone = phone;
  newUser.Gender = checked;
  newUser.BirthDate = birthDate;
  newUser.Password = password;
  newUser.StreetNameAndNumber = streetNum;
  newUser.CityId = selectedCity;
newUser.UserImg="https://cdn-icons-png.flaticon.com/512/149/149071.png";
 
  const onSignUPPressed = () => {
    { console.log(newUser) }
    fetch(apiUrl, {
      method: 'POST',
      body: JSON.stringify(newUser),
      headers: new Headers({
        'Content-type': 'application/json; charset=UTF-8',
        'Accept': 'application/json; charset-UTF-8'
      })
    }).then(response => { return response.json() })
      .then(data => {
         
        console.log("dataaaaaa:", data);
        setIsUserExists(data.isSuccess) 
     
        if (IsUserExists) {
         
          console.log("hjhjhjhkljkj", isSelected)
          if (isSelected) {
            storeData(newUser)
          }
        } else {
          alert(data.message);
        }
      });
      navigation.navigate('SignInScreen');
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
          <RadioForm style={{ flexDirection: 'row' }}
            radio_props={options}
            initial={0}
            onPress={(value) => {
              setChecked(value);
            }}
          />
        </View>

        <View style={styles.container} >
          <CityList />

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


        </View>
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
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 20,
  },
  datePickerStyle: {
    width: cardWidth,
    marginRight: 10,

  },
  container: {
    color: "black",
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: "center"
  }

})