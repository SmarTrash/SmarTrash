import { View, Text, StyleSheet, ScrollView, SafeAreaView, Dimensions, Image, Keyboard } from 'react-native'
import React, { useState, useContext } from 'react'
import CustomInput from '../../Components/CustomInput/CustomInput'
import CustonButton from '../../Components/CustomButton/CustonButton'
import DatePicker from 'react-native-datepicker';
import RadioForm from 'react-native-simple-radio-button';
import CityList from '../../Components/City/CityList';
import { GlobalContext } from '../../../GlobalContext/GlobalContext';
import { Provider } from 'react-native-paper';
import COLORS from '../../Consts/colors';
import EditImage from '../EditImage/EditImage';
import AsyncStorage from '@react-native-async-storage/async-storage'
import moment from 'moment';
const { width } = Dimensions.get('screen');
const cardWidth = width / 1.2;


const apiUrl = 'http://proj.ruppin.ac.il/bgroup91/prod/api/HomePage/DeleteUser';
const apiUrlSaveChanges = 'http://proj.ruppin.ac.il/bgroup91/prod/api/HomePage/UpdateDetails';

const EditProfile = ({ navigation }) => {
  const { userEmail, selectedCity, setSelectedCity,
    setUserFirstName, userFirstName,
    setUserLastName, userLastName,
    setUserGender, userGender,
    setUserPhone, userPhone,
    setUserBirthDate, userBirthDate,
    setUserStreetNameAndNumber, userStreetNameAndNumber,
    userImg, password, setPassword } = useContext(GlobalContext);

  const options = [
    { label: ' אישה   ', value: 'F' },
    { label: ' גבר', value: 'M' },
  ];

  const date = new Date();
  //   const d = '${date.getDate()}/${date.getMonth()}/${date.getFullYear() - 6}';
  // // console.log('vvvv',moment(new Date(userBirthDate)).format('DD/MM/YYYY'));
  // console.log('ddd',d);
  const [inputs, setInputs] = useState({
    email: userEmail,
    firstName: userFirstName,
    lastName: userLastName,
    phone: userPhone,
    password: password,
    streetNameAndNumber: userStreetNameAndNumber
  });
  const [errors, setErrors] = React.useState({});

  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;

    if (!inputs.email) {
      handleError('הכנס אימייל', 'email');
      isValid = false;
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      handleError('הכנס אימייל תקין', 'email');
      isValid = false;
    }

    if (!inputs.firstName) {
      handleError('הכנס שם פרטי', 'firstName');
      isValid = false;
    } else if (inputs.firstName.length < 2) {
      handleError('שם פרטי חייב להיות מעל 2 אותיות', 'firstName');
      isValid = false;
    }

    if (!inputs.lastName) {
      handleError('הכנס שם משפחה', 'lastName');
      isValid = false;
    } else if (inputs.lastName.length < 2) {
      handleError('שם משפחה חייב להיות מעל 2 אותיות', 'lastName');
      isValid = false;
    }

    if (!inputs.phone) {
      handleError('הכנס מספר טלפון', 'phone');
      isValid = false;
    } else if (inputs.phone.length != 10) {
      handleError('טלפון חייב להכיל 10 ספרות', 'phone');
      isValid = false;
    }

    if (!inputs.password) {
      handleError('הכנס סיסמה', 'password');
      isValid = false;
    } else if (inputs.password.length < 8) {
      handleError('סיסמה חייבת להכיל לפחות 8 ספרות ואותיות', 'password');
      isValid = false;
    }
    if (!inputs.streetNameAndNumber) {
      handleError('הכנס רחוב ומספר בית', 'streetNameAndNumber');
      isValid = false;
    }
    if (isValid) {
      userChangeSave();
    }
  };
  const newUser = {
    UserEmail: inputs.email,
    FirstName: inputs.firstName,
    LastName: inputs.lastName,
    Phone: inputs.phone,
    Gender: userGender,
    BirthDate: userBirthDate,
    Password: inputs.password,
    StreetNameAndNumber: inputs.streetNameAndNumber,
    CityId: selectedCity,
    UserImg: userImg,
  }

  const userChangeSave = () => {
    console.log('newUser', newUser);
    fetch(apiUrlSaveChanges, {
      method: 'PUT',
      body: JSON.stringify(newUser),
      headers: new Headers({
        'Content-type': 'application/json; charset=UTF-8',
        'Accept': 'application/json; charset-UTF-8'
      })
    }).then(response => { return response.json() })
      .then(data => {
        console.log("דאטה", data)
        if (data.isSuccess) {
          updateData(newUser);
          alert(data.message);
          navigation.navigate('Home')
        } else {
          alert(data.message);
        }
      });
  }
  const DeleteUser = () => {
    removeData()
    fetch(apiUrl, {
      method: 'DELETE',
      body: JSON.stringify({ UserEmail: userEmail }),
      headers: new Headers({
        'Content-Type': 'application/json; charset-UTF-8',
        'Accept': 'application/json; charset-UTF-8',
      })
    })
      .then(res => {
        console.log('res=', res);
        return res.json()
      })
      .then(
        (result) => {
          console.log("fetch del= ", result);
          navigation.navigate("SignInScreen")
        },
        (error) => {
          console.log("err del=", error);
        });
  }
  const removeData = async () => {
    try {
      await AsyncStorage.removeItem('@storage_Key');
      { console.log("@storage_Key:", AsyncStorage) }
      navigation.navigate('SignInScreen');
    } catch (error) {
      console.log(error);
    }
  }
  const updateData = async (u) => {
    AsyncStorage.getItem('@storage_Key')
      .then(data => {
        data = JSON.parse(data);
        console.log(data);

        data.StreetNameAndNumber = u.StreetNameAndNumber,
          data.BirthDate = u.BirthDate,
          data.CityId = u.CityId,
          data.FirstName = u.FirstName,
          data.LastName = u.LastName,
          data.Gender = u.Gender,
          data.Password = u.Password,
          data.Phone = u.Phone,
          setUserFirstName(u.FirstName),
          setUserLastName(u.LastName),
          setPassword(u.Password),
          setUserPhone(u.Phone),
          setUserBirthDate(u.BirthDate),
          setSelectedCity(u.CityId),
          setUserGender(u.Gender),
          setUserStreetNameAndNumber(u.StreetNameAndNumber)

        AsyncStorage.setItem('@storage_Key', JSON.stringify(data));
      }).done();
  }
  const handleOnchange = (text, input) => {
    setInputs(prevState => ({ ...prevState, [input]: text }));
  };
  const handleError = (error, input) => {
    setErrors(prevState => ({ ...prevState, [input]: error }));
  };
  const now = new Date();
  const today = new Date(now.getFullYear() - 18, now.getMonth(), now.getDate())
  return (

    <Provider>
      <ScrollView showsVerticalScrollIndicator={false}
        style={{ backgroundColor: 'white' }} >
        <View style={styles.root}>
          <Text style={styles.title}>עריכת פרטים אישיים</Text>
          <View style={{ alignSelf: 'center' }}>
            <View style={styles.profileImage}>
              <Image
                style={styles.image}
                source={{ uri: userImg }} />
            </View>
            <View style={{ left: 10, bottom: 70 }}>
              <EditImage />
            </View>
          </View>
        </View>
        <View style={{ marginVertical: 20, margin: 15,marginTop:0 }}>
          <CustomInput
            onChangeText={text => handleOnchange(text, 'firstName')}
            onFocus={() => handleError(null, 'firstName')}
            iconName="person"
            label="שם פרטי"
            defaultValue={inputs.firstName}
            placeholder="הכנס שם פרטי"
            error={errors.firstName}
          />
          <CustomInput
            onChangeText={text => handleOnchange(text, 'lastName')}
            onFocus={() => handleError(null, 'lastName')}
            iconName="person"
            label="שם משפחה"
            defaultValue={inputs.lastName}
            placeholder="הכנס שם משפחה"
            error={errors.lastName}
          />
          <CustomInput
            onChangeText={text => handleOnchange(text, 'password')}
            onFocus={() => handleError(null, 'password')}
            iconName="lock-outline"
            label="סיסמה"
            defaultValue={inputs.password}
            placeholder="הכנס סיסמה"
            error={errors.password}
            password
          />
          <CustomInput
            keyboardType="numeric"
            onChangeText={text => handleOnchange(text, 'phone')}
            onFocus={() => handleError(null, 'phone')}
            iconName="phone-android"
            label="טלפון"
            defaultValue={inputs.phone}
            placeholder="הכנס מספר טלפון"
            error={errors.phone}
          />
          <CustomInput
            onChangeText={text => handleOnchange(text, 'streetNameAndNumber')}
            onFocus={() => handleError(null, 'streetNameAndNumber')}
            iconName="home"
            label="רחוב ומספר בית"
            defaultValue={inputs.streetNameAndNumber}
            placeholder="הכנס רחוב ומספר בית"
            error={errors.streetNameAndNumber}
          />
          <View style={{ alignSelf: 'center', margin: 5 }}>
            <RadioForm style={{ flexDirection: 'row' }}
              radio_props={options}
              initial={0}
              selectedButtonColor={COLORS.green}
              buttonColor={COLORS.green}
              onPress={(value) => {
                setUserGender(value);
              }}
            />
          </View>
          <SafeAreaView style={styles.container}>
            <View style={styles.container}>
              <DatePicker
                style={styles.datePickerStyle}
                date={userBirthDate}
                format="YYYY/MM/DD"
                mode="date"
                placeholder="הכנס תאריך לידה"
                maxDate={today}
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
                  console.log(date);
                  setUserBirthDate(date);
                }}
              />
            </View>
          </SafeAreaView>
          <View style={{ alignSelf: 'center' }}>
            <CityList />
          </View>
          <View >
            <CustonButton
              text='שמירה'
              onPress={validate}
            />
          </View>
          <View >
            <CustonButton
              bgColor={COLORS.red}
              text='מחיקת משתמש'
              onPress={DeleteUser}
            />
          </View>
        </View>
      </ScrollView>
    </Provider>
  )
}

export default EditProfile

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.green,
    margin: 10,
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
    marginRight: 10,

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
  }
})