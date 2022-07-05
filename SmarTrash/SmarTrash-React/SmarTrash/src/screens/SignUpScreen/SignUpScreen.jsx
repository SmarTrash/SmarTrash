import React, { useContext } from 'react';
import { View, Text,SafeAreaView, Keyboard,ScrollView, Alert, StyleSheet} from 'react-native';
import COLORS from '../../Consts/colors'
import CustonButton from '../../Components/CustomButton/CustonButton'
import CustomInput from '../../Components/CustomInput/CustomInput'
import Loader from '../../Components/Loader/Loader';
import RadioForm from 'react-native-simple-radio-button';
import CityList from '../../Components/City/CityList'
import DatePicker from 'react-native-datepicker';
import { GlobalContext } from '../../../GlobalContext/GlobalContext'

const apiUrl = 'http://proj.ruppin.ac.il/bgroup91/prod/api/Registration';

const SignUpScreen = ({ navigation }) => {
  const { selectedCity,
    userImg,userGender, setUserGender, userBirthDate, setUserBirthDate} = useContext(GlobalContext);
  const options = [
    { label: '  נקבה', value: 'F' },
    { label: '  זכר', value: 'M' },
  ];
  const date = new Date();
  const d = '${date.getDate()}/${date.getMonth()}/${date.getFullYear() - 6}';
  const [inputs, setInputs] = React.useState({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    password: '',
    streetNameAndNumber: ''
  });
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;

    if (!inputs.email) {
      handleError(' הכנס אימייל', 'email');
      isValid = false;
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      handleError(' הכנס אימייל תקין', 'email');
      isValid = false;
    }

    if (!inputs.firstName) {
      handleError(' הכנס שם פרטי', 'firstName');
      isValid = false;
    } else if (inputs.firstName.length < 2) {
      handleError('שם פרטי חייב להיות מעל 2 אותיות', 'firstName');
      isValid = false;
    }

    if (!inputs.lastName) {
      handleError(' הכנס שם משפחה', 'lastName');
      isValid = false;
    } else if (inputs.lastName.length < 2) {
      handleError('שם משפחה חייב להיות מעל 2 אותיות', 'lastName');
      isValid = false;
    }

    if (!inputs.phone) {
      handleError(' הכנס מספר טלפון', 'phone');
      isValid = false;
    } else if (inputs.phone.length != 10) {
      handleError('טלפון חייב להכיל 10 ספרות', 'phone');
      isValid = false;
    }

    if (!inputs.password) {
      handleError(' הכנס סיסמה', 'password');
      isValid = false;
    } else if (inputs.password.length < 8) {
      handleError('סיסמה חייבת להכיל לפחות 8 ספרות ואותיות', 'password');
      isValid = false;
    }
    if (!inputs.streetNameAndNumber) {
      handleError(' הכנס רחוב ומספר בית', 'streetNameAndNumber');
      isValid = false;
    }
    if (isValid) {
      register();
    }
  };
  const newUser = {
  UserEmail: inputs.email,
  FirstName :inputs.firstName,
  LastName : inputs.lastName,
  Phone:inputs.phone,
  Gender: userGender,
  BirthDate: userBirthDate,
  Password : inputs.password,
  StreetNameAndNumber: inputs.streetNameAndNumber,
  CityId : selectedCity,
  UserImg: userImg,
  }
  const register = () => {
    setLoading(true);
    setTimeout(() => {
      try {
        setLoading(false);
        fetch(apiUrl, {
          method: 'POST',
          body: JSON.stringify(newUser),
          headers: new Headers({
            'Content-type': 'application/json; charset=UTF-8',
            'Accept': 'application/json; charset-UTF-8'
          })
        }).then(response => { return response.json() })
      
        navigation.navigate('SignInScreen');
     
    } catch (error) {
      Alert.alert('Error', 'Something went wrong');
    }
  }, 3000);
};

const handleOnchange = (text, input) => {
  setInputs(prevState => ({ ...prevState, [input]: text }));
};
const handleError = (error, input) => {
  setErrors(prevState => ({ ...prevState, [input]: error }));
};
return (
  <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
    <Loader visible={loading} />
    <ScrollView
      contentContainerStyle={{ paddingTop: 50, paddingHorizontal: 20 }}>
      <Text style={{ color: COLORS.black, fontSize: 40, fontWeight: 'bold', textAlign: 'center' }}>
        יצירת חשבון
      </Text>

      <View style={{ marginVertical: 20 }}>
        <CustomInput
          onChangeText={text => handleOnchange(text, 'email')}
          onFocus={() => handleError(null, 'email')}
          iconName="email"
          label="אימייל"
          placeholder="הכנס כתובת אימייל"
          error={errors.email}
        />
        <CustomInput
          onChangeText={text => handleOnchange(text, 'password')}
          onFocus={() => handleError(null, 'password')}
          iconName="lock-outline"
          label="סיסמה"
          placeholder="הכנס סיסמה"
          error={errors.password}
          password
        />
        <CustomInput
          onChangeText={text => handleOnchange(text, 'firstName')}
          onFocus={() => handleError(null, 'firstName')}
          iconName="person"
          label="שם פרטי"
          placeholder="הכנס שם פרטי"
          error={errors.firstName}
        />
        <CustomInput
          onChangeText={text => handleOnchange(text, 'lastName')}
          onFocus={() => handleError(null, 'lastName')}
          iconName="person"
          label="שם משפחה"
          placeholder="הכנס שם משפחה"
          error={errors.lastName}
        />

        <CustomInput
          keyboardType="numeric"
          onChangeText={text => handleOnchange(text, 'phone')}
          onFocus={() => handleError(null, 'phone')}
          iconName="phone-android"
          label="טלפון"
          placeholder="הכנס מספר טלפון"
          error={errors.phone}
        />
        <CustomInput
          onChangeText={text => handleOnchange(text, 'streetNameAndNumber')}
          onFocus={() => handleError(null, 'streetNameAndNumber')}
          iconName="home"
          label="רחוב ומספר בית"
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
                setUserBirthDate(date); 
              }}
            />
          </View>
        </SafeAreaView>
        <View style={{ alignSelf: 'center' }}>
          <CityList />
        </View>
        <CustonButton text="הרשמה" onPress={validate} />
        <Text
          onPress={() => navigation.navigate('SignInScreen')}
          style={{
            color: COLORS.grey,
            fontWeight: 'bold',
            textAlign: 'center',
            fontSize: 16,
            fontStyle: 'italic'
          }}>
          משתמש רשום? היכנס
        </Text>
      </View>
    </ScrollView>
  </SafeAreaView>
);
};

export default SignUpScreen;
const styles = StyleSheet.create({

  datePickerStyle: {
    marginRight: 10,

  },
  container: {
    color: "black",
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: "center"
  },
  

})