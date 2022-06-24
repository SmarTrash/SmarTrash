import { View, Text, StyleSheet, ScrollView, SafeAreaView, Dimensions, Image, TouchableOpacity } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import CustomInput from '../../Components/CustomInput/CustomInput'
import CustonButton from '../../Components/CustomButton/CustonButton'
import DatePicker from 'react-native-datepicker';
import RadioForm from 'react-native-simple-radio-button';
import CityList from '../../Components/City/CityList';
import { GlobalContext } from '../../../GlobalContext/GlobalContext';
import { Provider } from 'react-native-paper';
import COLORS from '../../Consts/colors';
import EditImage from '../EditImage/EditImage';

const { width } = Dimensions.get('screen');
const cardWidth = width / 1.2;

const apiUrl = 'http://proj.ruppin.ac.il/bgroup91/prod/api/HomePage/DeleteUser';
const apiUrlSaveChanges = 'http://proj.ruppin.ac.il/bgroup91/prod/api/HomePage/UpdateDetails';

const EditProfile = ({ navigation }) => {
  const { userEmail, selectedCity,
     setChecked,
    setUserFirstName,
    setUserLastName,
    setUserGender, userGender,
    setUserPhone, userPhone,
    setUserBirthDate, userBirthDate,
    setUserStreetNameAndNumber, userStreetNameAndNumber,
    userImg,setUserImg,
    userCityId,
    password, setPassword,
    userFirstName,
    userLastName,
  } = useContext(GlobalContext);

  
  const [changeSave, setChangeSave] = useState('');

  const options = [
    { label: ' אישה   ', value: 'F' },
    { label: ' גבר', value: 'M' },
  ];

  const date = new Date();
  const d = '${date.getDate()}/${date.getMonth()}/${date.getFullYear() - 6}';



  const userChangeSave = () => {
    const newUser = {
      UserEmail: userEmail,
      Password: password,
      UserImg: userImg,
      Gender: userGender,
      FirstName: userFirstName,
      LastName: userLastName,
      Phone: userPhone,
      CityId: userCityId,
      StreetNameAndNumber: userStreetNameAndNumber,
      BirthDate: userBirthDate
    }
    console.log("hhhhhhhhh", newUser)
    fetch(apiUrlSaveChanges, {

      method: 'PUT',
      body: JSON.stringify(newUser),
      headers: new Headers({
        'Content-type': 'application/json; charset=UTF-8',
        'Accept': 'application/json; charset-UTF-8'
      })
    }).then(response => { return response.json(), setChangeSave(response.status), console.log("statuuuuuuus:", response.status) })
      .then(data => {
        console.log("דאטה", changeSave)
        if (changeSave == 200) {
          alert("התבצע");
          navigation.navigate('Home')
        } else {
          alert("השמירה לא התבצעה");
        }

      });

  }
  const DeleteUser = () => {
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

 
  return (

    <Provider>
      <ScrollView showsVerticalScrollIndicator={false}
        style={{ backgroundColor: 'white' }}
      >

        <View style={styles.root}>
          <Text style={styles.title}>עריכת פרטים אישיים</Text>
          <View style={{ alignSelf: 'center' }}>
              <View style={styles.profileImage}>
                <Image
                  style={styles.image}
                  source={{ uri: userImg }} />
                  <EditImage />
              </View>
        
            <View style={styles.edit}>
        
        </View>
          </View>
        </View>

        <View style={{ alignSelf: 'center' }}>

          <CustomInput
            placeholder={userFirstName}
            value={userFirstName}
            setValue={setUserFirstName}
          />

          <CustomInput
            placeholder={userLastName}
            value={userLastName}
            setValue={setUserLastName}
          />

          <CustomInput
            placeholder={password}
            value={password}
            setValue={setPassword}
            secureTextEntry={true}
          />

          <CustomInput
            placeholder={userPhone}
            value={userPhone}
            setValue={setUserPhone}
          />
          <CustomInput
            placeholder={userStreetNameAndNumber}
            value={userStreetNameAndNumber}
            setValue={setUserStreetNameAndNumber}
          />
        </View>
        <View >
          <RadioForm style={styles.radioBtn}
            radio_props={options}
            initial={0}
            buttonColor={COLORS.primary}
            buttonSize={15}
            buttonWrapStyle={{ marginLeft: 100 }}
            selectedButtonColor={COLORS.green}
            defaultChecked={userGender}
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
              placeholder={userBirthDate}
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

        <View style={{ alignItems: 'center', alignContent: 'center', padding: 5 }}>
          <CityList />
        </View>
        <View >
          <CustonButton
            text='שמירה'
            onPress={userChangeSave}
          />
        </View>
        <View >
          <CustonButton
          bgColor={COLORS.red}
            text='מחיקת משתמש'
            onPress={DeleteUser}
          />
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
    color: "#051C60",
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
  },
  radioBtn: {
    flexDirection: 'row',
    alignSelf: 'center',
    padding: 13,
    paddingBottom: 3

  },
})