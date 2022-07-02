import React, { useContext, useEffect } from 'react'
import { StyleSheet, View, Text,Keyboard } from 'react-native'
import CustomInput from '../../Components/CustomInput/CustomInput'
import { GlobalContext } from '../../../GlobalContext/GlobalContext'
import CityList from '../../Components/City/CityList'
import CustonButton from '../../Components/CustomButton/CustonButton'
const AddNewAdress = ({ navigation, route }) => {

 const { userOrderPhone, setuserOrderPhone,userOrderStreetNameAndNumber, setuserOrderStreetNameAndNumber, userCityName } = useContext(GlobalContext); 
 
 const [inputs, setInputs] = React.useState({
    phone: '',
    streetNameAndNumber: ''
  });
  
 

  const onSaveAdress = (P,S) => {
    console.log('userOrderStreetNameAndNumber',S);
    route.params.addAdress({ userCityName, S, P });
    navigation.goBack();
  }
  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;

    if (!inputs.phone) {
      handleError('בבקשה הכנס מספר טלפון', 'phone');
      isValid = false;
    } else if (inputs.phone.length != 10) {
      handleError('טלפון חייב להכיל 10 ספרות', 'phone');
      isValid = false;
    }

    if (!inputs.streetNameAndNumber) {
      handleError('בבקשה הכנס רחוב ומספר בית', 'streetNameAndNumber');
      isValid = false;
    }
    if (isValid) {
      console.log('inputs.phone',inputs.phone);
      setuserOrderPhone(inputs.phone)
      setuserOrderStreetNameAndNumber(inputs.streetNameAndNumber)
     
      onSaveAdress(inputs.phone,inputs.streetNameAndNumber);
    }
  };
  const [errors, setErrors] = React.useState({});
  const handleOnchange = (text, input) => {
    setInputs(prevState => ({ ...prevState, [input]: text }));
  };
  const handleError = (error, input) => {
    setErrors(prevState => ({ ...prevState, [input]: error }));
  };
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>הוסף כתובת</Text>

        <CustomInput
          onChangeText={text => handleOnchange(text, 'streetNameAndNumber')}
          onFocus={() => handleError(null, 'streetNameAndNumber')}
          iconName="home"
          label="רחוב ומספר בית"
          placeholder="הכנס רחוב ומספר בית"
          error={errors.streetNameAndNumber}
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
        <View style={{ alignSelf: 'center',margin:30 }}>
          <CityList />
        </View>
        <View>
        <CustonButton text="הוסף" onPress={validate} />
        </View>
      </View>
    </>
  )
}
export default AddNewAdress;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 90,
    paddingHorizontal: 40
  },

  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    fontWeight: 'bold'
  },
  text: {
    height: 300,
    fontSize: 16
  },
  fab: {
    position: 'absolute',
    margin: 20,
    right: 0,
    bottom: 0,
    backgroundColor: '#99FFFF'
  }
})