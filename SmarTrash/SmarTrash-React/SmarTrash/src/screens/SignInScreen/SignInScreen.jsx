import { View, StyleSheet, ScrollView, SafeAreaView, ImageBackground, Dimensions, Text, TouchableOpacity, Keyboard, } from 'react-native'
import React, { useEffect, useContext,useState } from 'react'
import bg from '../../../assets/bg.jpg'
import CustomInput from '../../Components/CustomInput/CustomInput'
import CustonButton from '../../Components/CustomButton/CustonButton'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ListItem } from 'react-native-elements'
import COLORS from '../../Consts/colors'
import { GlobalContext } from '../../../GlobalContext/GlobalContext'
import Checkbox from 'react-native-bouncy-checkbox'
import Loader from '../../Components/Loader/Loader';

const apiUrl = 'http://proj.ruppin.ac.il/bgroup91/prod/api/HomePage/HomePageDetails';


const SignInScreen = ({ navigation }) => {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { userEmail, setUserEmail,
    checked, setChecked,
    setUserFirstName,
    setUserLastName,
    setUserCompetitionPlace,
    setUserLastThrow,
    setUserPoints,
    setUserGender,
    setUserPhone, userPhone,
    setUserBirthDate,
    selectedCity, setSelectedCity,
    setUserStreetNameAndNumber,
    setUserImg, userImg,
    password, setPassword } = useContext(GlobalContext);

  useEffect(() => {

    const getData = async () => {
      try {
        AsyncStorage.getItem('@storage_Key')
          .then(value => {
            if (value != null) {
              console.log("gjhjhjh:", value)
              let jsonValue = JSON.parse(value);
              setUserEmail(jsonValue.userEmail)
              setUserFirstName(jsonValue.FirstName),
                setUserLastName(jsonValue.LastName),
                setPassword(jsonValue.Password),
                setUserEmail(jsonValue.UserEmail),
                setUserCompetitionPlace(jsonValue.competitionPlace),
                setUserLastThrow(jsonValue.lastThrow),
                setUserPoints(jsonValue.Points),
                setUserImg(jsonValue.Img),
                setUserPhone(jsonValue.Phone),
                setUserBirthDate(jsonValue.BirthDate),
                setSelectedCity(jsonValue.CityId),
                setUserGender(jsonValue.Gender),
                setUserStreetNameAndNumber(jsonValue.StreetNameAndNumber)
              console.log("ddddddddddddddddddddddddd", userPhone);
              navigation.navigate('Home', jsonValue);
            }
          })
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, []);

  const [inputs, setInputs] =useState({
    email:'',
    password:'',
  });

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
    if (!inputs.password) {
      handleError('בבקשה הכנס סיסמה', 'password');
      isValid = false;
    } else if (inputs.password.length < 8) {
      handleError('סיסמה חייבת להכיל לפחות 8 ספרות ואותיות', 'password');
      isValid = false;
    }

    if (isValid) {
      onSignInPressed();
    }
  };
  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      console.log("dataaaaaa:", value);
      await AsyncStorage.setItem('@storage_Key', jsonValue)
      navigation.navigate('Home');
    } catch (e) {
      console.log(e);
    }
  }
  const newUser = {
    UserEmail: inputs.email,
    Password: inputs.password,
    FirstName: "",
    LastName: "",
    Phone: "",
    Gender: "",
    BirthDate: "",
    StreetNameAndNumber: "",
    CityId: "",
    Img: "",
    competitionPlace: "",
    lastThrow: "",
    Points: "",

  }
  const onSignInPressed = () => {
    setLoading(true);
    setTimeout(() => {
      try {
        setLoading(false);
        console.log("11111111111", newUser);
        fetch(apiUrl, {
          method: 'POST',
          body: JSON.stringify(newUser),
          headers: new Headers({
            'Content-type': 'application/json; charset=UTF-8',
            'Accept': 'application/json; charset-UTF-8'

          })
        }).then(response => { return response.json() })
          .then(data => {
            if (data.isSuccess == false) {
              alert(data.message);
            } else {
              setUserEmail(inputs.email)
              setPassword(inputs.password)
              setUserFirstName(data[0].First),
                setUserLastName(data[0].Last),
                setUserCompetitionPlace(data[0].competitionPlace),
                setUserLastThrow(data[0].lastThrow),
                setUserPoints(data[0].Points),
                setUserGender(data[0].gender),
                setUserPhone(data[0].phone),
                setUserBirthDate(data[0].birthDate),
                setSelectedCity(data[0].cityId),
                setUserStreetNameAndNumber(data[0].streetNum),
                setUserImg(data[0].Img)
              console.log("data[0]:", data[0])
              newUser.UserEmail = inputs.email,
                newUser.Password = inputs.password,
                newUser.Img = data[0].Img,
                newUser.FirstName = data[0].First,
                newUser.LastName = data[0].Last,
                newUser.competitionPlace = data[0].competitionPlace,
                newUser.lastThrow = data[0].lastThrow,
                newUser.Points = data[0].Points,
                newUser.Phone = data[0].phone,
                newUser.BirthDate = data[0].birthDate,
                newUser.CityId = data[0].cityId,
                newUser.Gender = data[0].gender,
                newUser.StreetNameAndNumber = data[0].streetNum,
                console.log("newUser:", newUser)

              if (checked) {
                storeData(newUser)
              }
              else {
                navigation.navigate('Home');
              }
            }
          });
      } catch (error) {
        Alert.alert('Error', 'Something went wrong');
      }
    }, 1000);
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
      <ScrollView showsVerticalScrollIndicator={false} style={styles.root}>
        <ImageBackground source={bg} style={styles.logo} >
          <View style={styles.brandView}>
            <Text style={styles.brandViewText}>SmarTrash</Text>
          </View>
        </ImageBackground>
        <View style={styles.bottomView} >
          <View style={{ padding: 40 }}>

            <Text style={{ color: 'black', fontSize: 34, fontWeight: 'bold', textAlign: 'center' }}>ברוכים הבאים</Text>
            <Text style={{ fontSize: 18, textAlign: 'center' }}>אין לך חשבון?
              <Text onPress={() => navigation.navigate('SignUpScreen')} style={{ color: COLORS.green, fontStyle: 'italic', textAlign: 'justify', fontSize: 18 }}
              > הירשם עכשיו!</Text>
            </Text>
            <View style={{ marginVertical: 20 }}>
              <CustomInput
                onChangeText={text => handleOnchange(text, 'email')}
                onFocus={() => handleError(null, 'email')}
                iconName="email"
                label="אימייל"
                placeholder="אימייל"
                error={errors.email}
              />
              <CustomInput
                onChangeText={text => handleOnchange(text, 'password')}
                onFocus={() => handleError(null, 'password')}
                iconName="lock-outline"
                label="סיסמה"
                placeholder="סיסמה"
                error={errors.password}
                password
              />

              <View style={styles.forgetPassView}>
              <View style={{ flex: 1 }}>
                  <ListItem noBorder>
                    <View style={styles.container}>
                      <View>
                        <Text style={{ color: '#8f9195',  marginLeft: 35,}}>זכור אותי</Text>
                        <Checkbox
                          style={{ marginRight: 90, marginTop: -23 }}
                          status={checked ? 'checked' : 'unchecked'}
                          onPress={() => {
                            setChecked(!checked);
                          }}
                          fillColor={COLORS.green}
                        />
                      </View>
                    </View>
                  </ListItem>
                </View>
                <View >
                  <TouchableOpacity onPress={() => navigation.navigate('ForgotPasswordScreen')}>
                    <ListItem noBorder>
                      <Text style={{ color: '#8f9195', marginLeft:35}}>שכחתי סיסמה</Text>
                    </ListItem>
                  </TouchableOpacity>
                </View>
               
              </View>
              <View
                style={{
                  margin: 10,
                  height: 100,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                <CustonButton
                  text="התחברות"
                  onPress={validate}
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>

  );
};

export default SignInScreen;
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  logo: {
    height: Dimensions.get('window').height / 2.5
  },
  icon: {
    color: '#ffffff',
    fontSize: 100
  },
  brandView: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center'
  },
  brandViewText: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#ffffff',
    textTransform: 'uppercase'
  },
  bottomView: {
    flex: 1.5,
    backgroundColor: '#ffffff',
    bottom: 50,
    borderTopStartRadius: 60,
    borderTopEndRadius: 60
  },
  forgetPassView: {
    height: 50,
    marginTop: 0,
    flexDirection: 'row',
   
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  loginBtn: {
    alignSelf: 'center',
    backgroundColor: '#4632A1',
    width: Dimensions.get('window').width / 2,
    justifyContent: 'center'
  },
  error: {
    fontSize: 14,
    color: 'red',

  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  }
})
