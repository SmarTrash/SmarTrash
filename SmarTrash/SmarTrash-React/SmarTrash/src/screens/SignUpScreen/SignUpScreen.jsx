import { View, Text, StyleSheet, ScrollView, SafeAreaView, Dimensions, TouchableOpacity,Image } from 'react-native'
import React, { useState, useContext } from 'react'
import CustomInput from '../../Components/CustomInput/CustomInput'
import CustonButton from '../../Components/CustomButton/CustonButton'
import DatePicker from 'react-native-datepicker';
import RadioForm from 'react-native-simple-radio-button';
import CityList from '../../Components/City/CityList'
import { GlobalContext } from '../../../GlobalContext/GlobalContext'
import COLORS from '../../Consts/colors'
import EditImage from '../EditImage/EditImage';
const { width } = Dimensions.get('screen');
const cardWidth = width / 1.2;
const apiUrl = 'http://proj.ruppin.ac.il/bgroup91/prod/api/Registration';

const SignUpScreen = ({ navigation }) => {

  const { selectedCity,  userImg,setUserImg } = useContext(GlobalContext);
  const [userEmail, setUserEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [checked, setChecked] = useState('F');
  const [birthDate, setBirthDate] = useState('');
  const [password, setPassword] = useState('');
  const [streetNum, setStreetNum] = useState('');

  const options = [
    { label: '  נקבה', value: 'F' },
    { label: '  זכר', value: 'M' },
  ];
  const date = new Date();
  const d = '${date.getDate()}/${date.getMonth()}/${date.getFullYear() - 6}';
console.log("d",d)
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
    UserImg: ""
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
  newUser.UserImg = userImg;

  const onSignUPPressed = () => {
    { console.log("newUser",newUser) }
    fetch(apiUrl, {
      method: 'POST',
      body: JSON.stringify(newUser),
      headers: new Headers({
        'Content-type': 'application/json; charset=UTF-8',
        'Accept': 'application/json; charset-UTF-8'
      })
    }).then(response => { return response.json()})
      .then(data => {
        data.map(st => console.log("bvvvvv", st))
        console.log("bvvvvv", data)
      });
    navigation.navigate('SignInScreen');
  }


  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>{'יצירת חשבון'}</Text>

        <View style={styles.profileImage}>
          <Image
            style={styles.image}
            source={{ uri: userImg }} />
        </View>
        <EditImage />
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
            selectedButtonColor={COLORS.green}
            buttonColor={COLORS.green}
            onPress={(value) => {
              setChecked(value);
            }}
          />
        </View>

        <View style={styles.container} >
          <CityList />

          <CustomInput
            maxLength={10}
            keyboardType='numeric'
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
        <TouchableOpacity onPress={() => { navigation.navigate('SignInScreen') }} >
          <Text style={{ fontStyle: 'italic', color: '#8f9195', textAlign: 'justify', fontSize: 16, padding: 10 }}> יש לך חשבון? התחבר!</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

export default SignUpScreen;
const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: COLORS.white,

  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 20,
    marginTop: 20,
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
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 100,
    overflow: 'hidden',
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
  },

})