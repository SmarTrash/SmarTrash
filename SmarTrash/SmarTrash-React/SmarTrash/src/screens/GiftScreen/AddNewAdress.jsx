import React, { useContext } from 'react'
import { StyleSheet, View, Text, Keyboard } from 'react-native'
import CustomInput from '../../Components/CustomInput/CustomInput'
import { GlobalContext } from '../../../GlobalContext/GlobalContext'
import CityList from '../../Components/City/CityList'
import CustonButton from '../../Components/CustomButton/CustonButton'
import COLORS from '../../Consts/colors'

const AddNewAdress = ({ navigation, route }) => {
  const [errors, setErrors] = React.useState({});
  const { setuserOrderPhone, setuserOrderStreetNameAndNumber, userCityName } = useContext(GlobalContext);
  const [inputs, setInputs] = React.useState({
    phone: '',
    streetNameAndNumber: ''
  });

  const onSaveAdress = (P, S) => {
    route.params.addAdress({ userCityName, S, P });
    navigation.goBack();
  }
  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;

    if (!inputs.phone) {
      handleError(' הכנס מספר טלפון', 'phone');
      isValid = false;
    } else if (inputs.phone.length != 10) {
      handleError('טלפון חייב להכיל 10 ספרות', 'phone');
      isValid = false;
    }

    if (!inputs.streetNameAndNumber) {
      handleError(' הכנס רחוב ומספר בית', 'streetNameAndNumber');
      isValid = false;
    }
    if (isValid) {
      console.log('inputs.phone', inputs.phone);
      setuserOrderPhone(inputs.phone)
      setuserOrderStreetNameAndNumber(inputs.streetNameAndNumber)
      onSaveAdress(inputs.phone, inputs.streetNameAndNumber);
    }
  };

  const handleOnchange = (text, input) => {
    setInputs(prevState => ({ ...prevState, [input]: text }));
  };
  const handleError = (error, input) => {
    setErrors(prevState => ({ ...prevState, [input]: error }));
  };
  return (
    <>
      <Text style={styles.title}>הוסף כתובת</Text>
      <CustomInput
        onChangeText={text => handleOnchange(text, 'streetNameAndNumber')}
        onFocus={() => handleError(null, 'streetNameAndNumber')}
        iconName="home"
        label="רחוב ומספר בית"
        placeholder="הכנס רחוב ומספר בית"
        mode='outlined'
        setValue={setuserOrderStreetNameAndNumber}
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
      <View style={{ alignSelf: 'center', margin: 30 }}>
        <CityList />
      </View>
      <View>
        <CustonButton text="הוסף" onPress={validate} />
      </View>
    </>
  )
}
export default AddNewAdress;
const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 50,
    color: COLORS.green
  },
  input: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.green,
    margin: 20
  }
})