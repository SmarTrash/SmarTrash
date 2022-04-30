import { View, Text, StyleSheet, ScrollView, SafeAreaView, Dimensions, Image, TouchableOpacity } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import CustomInput from '../../Components/CustomInput/CustomInput'
import CustonButton from '../../Components/CustomButton/CustonButton'
import DatePicker from 'react-native-datepicker';
import RadioForm from 'react-native-simple-radio-button';
import CityList from '../../Components/City/CityList';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { GlobalContext } from '../../../GlobalContext/GlobalContext';
import BottomSheet from '../../Components/BottomSheet/BottomSheet';
import { Provider } from 'react-native-paper';

BottomSheet
const { width } = Dimensions.get('screen');
BottomSheet
const cardWidth = width / 1.2;

const apiUrl = 'http://proj.ruppin.ac.il/bgroup91/prod/api/HomePage/DeleteUser';
const apiUrlCurrentDetails = 'http://proj.ruppin.ac.il/bgroup91/prod/api/Homepage/PlaceHoldersEdit';
const apiUrlSaveChanges = 'http://proj.ruppin.ac.il/bgroup91/prod/api/HomePage/UpdateDetails';

<<<<<<< Updated upstream
const EditProfile = ({ navigation,route }) => {

  const newImage = route.params;

  const { userEmail, selectedCity } = useContext(GlobalContext);
=======
const EditProfile = ({ navigation }) => {
  const { userEmail, selectedCity,

    setUserImg, setChecked,
    setUserFirstName,
    setUserLastName,
    setUserGender, userGender,
    setUserPhone,userPhone,
    setUserBirthDate, userBirthDate,
    setUserStreetNameAndNumber, userStreetNameAndNumber,
    userImg,
    userCityId,
    password, setPassword,
    userFirstName,
    userLastName,
  } = useContext(GlobalContext);
>>>>>>> Stashed changes
  const [userDetails, setUserDetails] = useState('');
  const [changeSave, setChangeSave] = useState('');


<<<<<<< Updated upstream
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [checked, setChecked] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [password, setPassword] = useState('');
  const [streetNum, setStreetNum] = useState('');
  const [image, setImage] = useState('');
  const [show, setShow] = useState(false)
=======


>>>>>>> Stashed changes
  useEffect(() => {
    //userDetailsPlaceHolder();
  }, []);

  const options = [
    { label: 'אישה', value: 'F' },
    { label: 'גבר', value: 'M' },
  ];
  const date = new Date();
  const d = '${date.getDate()}/${date.getMonth()}/${date.getFullYear() - 6}';


<<<<<<< Updated upstream
  const userDetailsPlaceHolder = () => {

    fetch(apiUrlCurrentDetails, {
      method: 'POST',
      body: JSON.stringify({ UserEmail: userEmail }),
      headers: new Headers({
        'Content-type': 'application/json; charset=UTF-8',
        'Accept': 'application/json; charset-UTF-8'
      })
    }).then(response => { return response.json() })
      .then(data => {
        data.map(st => setUserDetails(st), console.log("userD", userDetails))

      });
    setFirstName(userDetails.FirstName),
      setLastName(userDetails.LastName),
      setPhone(userDetails.Phone),
      setChecked(userDetails.Gender),
      setBirthDate(userDetails.BirthDate),
      setPassword(userDetails.Password),
      setStreetNum(userDetails.StreetNameAndNumber),
      setImage(userDetails.UserImg)
    setUserDetails(userDetails)

  }
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
    Image: image
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
  newUser.Image = userDetails.UserImg;
=======
  // const userDetailsPlaceHolder = () => {

  //   fetch(apiUrlCurrentDetails, {
  //     method: 'POST',
  //     body: JSON.stringify({ UserEmail: userEmail }),
  //     headers: new Headers({
  //       'Content-type': 'application/json; charset=UTF-8',
  //       'Accept': 'application/json; charset-UTF-8'
  //     })
  //   }).then(response => { return response.json() })
  //     .then(data => {
  //       data.map(st => setUserDetails(st), console.log("userD", userDetails))

  //     });
  //     setFirstName(userFirstName),
  //     setLastName(userLastName),
  //     setPhone(userDetails.Phone),
  //     setChecked(userDetails.Gender),
  //     setBirthDate(userDetails.BirthDate),
  //     setPassword(userDetails.Password),
  //     setStreetNum(userDetails.StreetNameAndNumber),
  //     setImage(userDetails.UserImg)
  //     setUserGender()
  //   setUserDetails(userDetails)

  // }
>>>>>>> Stashed changes

  const userChangeSave = () => {
    const newUser = {
      UserEmail: userEmail,
      Password: password,
      Img: userImg,
      Gender: userGender,
      First: userFirstName,
      Last: userLastName,
      Phone: userPhone,
      CityId:userCityId,
      setStreetNum:userStreetNameAndNumber,
      BirthDate:userBirthDate
    }
    console.log("hhhhhhhhh",newUser)
    fetch(apiUrlSaveChanges, {
      
      method: 'PUT',
      body: JSON.stringify( newUser),
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
  // const openOptions = () => {

  // }
  return (
<Provider>
    <ScrollView showsVerticalScrollIndicator={false}> 
      <View style={styles.root}>
        <Text style={styles.title}>עריכת פרטים אישיים</Text>
<<<<<<< Updated upstream
         
          <View style={{ alignSelf: 'center' }}>
          <TouchableOpacity onPress={() => setShow(true)}>
              <View style={styles.profileImage}>
                <Image
                  style={styles.image}
                  source={{ uri: 'https://i1.sndcdn.com/artworks-000354908502-csxtn2-t500x500.jpg' }} />
              </View>
            </TouchableOpacity >
            <View style={styles.edit}>
              <MaterialCommunityIcons name="circle-edit-outline" size={20} color='white' style={{ marginTop: 2, marginLeft: 2 }} />
            </View>
            <BottomSheet
              show={show} 
              onDismiss={() => {
                setShow(false);
              }}
            ></BottomSheet>
=======

        <View style={{ alignSelf: 'center' }}>
          <View style={styles.profileImage}>
            <Image
              style={styles.image}
              source={{ uri: userImg }} />
          </View>
          <View style={styles.edit}>
            <MaterialCommunityIcons name="circle-edit-outline" size={20} color='white' style={{ marginTop: 2, marginLeft: 2 }} />
>>>>>>> Stashed changes
          </View>
       
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

        <View >

          <RadioForm style={styles.radioBtn}
            radio_props={options}
            initial={0}
            onPress={(value) => {
              setUserGender(value);

            }}
          />
        </View>
        <CityList />

        <View>
          <CustonButton
            text='שמירה'
            onPress={userChangeSave}
          />
        </View>
        <View>
          <CustonButton
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
    backgroundColor: 'white'
  },
  deletebtn: {
    marginTop: 40,
    marginRight: 12,
    marginLeft: 10,
    height: 50,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: '#00C897'
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
  radioBtn: {
    flexDirection: 'row',
  },
  sortBtn: {
    marginTop: 40,
    marginRight: 12,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: '#00C897'
  },
  txt: {
    color: 'white',
    fontFamily: 'HelveticaNeue',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',

  },
})