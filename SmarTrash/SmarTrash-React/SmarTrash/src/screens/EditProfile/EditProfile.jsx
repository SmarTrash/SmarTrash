import { View, Text, StyleSheet, ScrollView, SafeAreaView, Dimensions, Image } from 'react-native'
import React, { useState } from 'react'
import CustomInput from '../../Components/CustomInput/CustomInput'
import CustonButton from '../../Components/CustomButton/CustonButton'
import SocialSignInButtons from '../../Components/SocialSignInButtons/SocialSignInButtons'
import DatePicker from 'react-native-datepicker';
import RadioForm from 'react-native-simple-radio-button';
import CityList from '../../Components/City/CityList';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('screen');
const cardWidth = width / 1.2;

const apiUrl = 'http://proj.ruppin.ac.il/bgroup91/prod/api/SignIn';

const EditProfile  = ({ navigation }) => {
  const [userEmail, setUserEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [checked, setChecked] = useState('אישה');
  const [birthDate, setBirthDate] = useState('');
  const [password, setPassword] = useState('');
  const [streetNum, setStreetNum] = useState('');
  const [city, setCity] = useState('');
  const [selectedCity, setSelectedCity] = useState();


  const options = [
    { label: 'אישה', value: 'אישה' },
    { label: 'גבר', value: 'גבר' },
  ];
  const date = new Date();
  const d = '${date.getDate()}/${date.getMonth()}/${date.getFullYear() - 6}';

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
  // newUser.CityId = value.CityId;
  
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
      <Text style={styles.title}>עריכת פרטים אישיים</Text>

      <View style={{ alignSelf: 'center' }}>
          <View style={styles.profileImage}>
            <Image
              style={styles.image}
              source={{ uri: 'https://www.thehandbook.com/cdn-cgi/image/width=300,height=300,fit=cover,q=85/https://files.thehandbook.com/uploads/2019/12/22708923_288175598347572_5346731196820750336_n.jpg' }} />
          </View>
          <View style={styles.edit}>
            <MaterialCommunityIcons name="circle-edit-outline" size={20} color='white' style={{ marginTop: 2, marginLeft: 2 }} />
          </View>
        </View>
        

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
          placeholder="סיסמה"
          value={password}
          setValue={setPassword}
          secureTextEntry={true}
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

          <RadioForm style={styles.radioBtn}
            radio_props={options}
            initial={0}
            onPress={(value) => {
              setChecked(value);

            }}
          />
        </View>


        <View style={styles.sortBtn}>
              <Text style={styles.txt}>שמירה</Text>
        </View>

 {/* <CityList key={city.id} name={city.name}/> */}

      </View>
    </ScrollView>
  )
}

export default EditProfile ;
const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 20,
    backgroundColor:'white'
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: "#051C60",
    margin: 10,
    fontFamily: 'HelveticaNeue',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 20,
  },
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  datePickerStyle: {
    width: cardWidth,
    marginRight: 10
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
  edit: {
    backgroundColor: '#00C897',
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 35,
    height: 35,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    right: 14,
    bottom: 5
  },
  radioBtn:{
      flexDirection:'row',
  },
  sortBtn: {
    marginTop: 40,
    marginRight: 12,
    marginLeft: 10,
    height: 50,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor:'#00C897'
  },
  txt:{
      color:'white',
      fontFamily: 'HelveticaNeue',
      textAlign: 'center',
      fontSize: 20,
      fontWeight: 'bold',
      justifyContent: 'center',
    alignItems: 'center',
      
  },
})