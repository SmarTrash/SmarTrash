import React, { useContext, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { FAB } from 'react-native-paper';
import CustomInput from '../../Components/CustomInput/CustomInput';
import { GlobalContext } from '../../../GlobalContext/GlobalContext';
import CityList from '../../Components/City/CityList';
import COLORS from '../../Consts/colors';

const AddNewAdress = ({ navigation, route }) => {

  useEffect(() => {
    setuserOrderPhone('')
    setuserOrderStreetNameAndNumber('')
  }, []);
  const { userOrderStreetNameAndNumber, setuserOrderStreetNameAndNumber, userOrderPhone, setuserOrderPhone, userCityName } = useContext(GlobalContext);

  const onSaveAdress = () => {
    route.params.addAdress({ userCityName, userOrderStreetNameAndNumber, userOrderPhone });
    navigation.goBack();
  }

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>הוספת כתובת</Text>
        <CityList style={{margin:20}}/>
        <CustomInput
          placeholder="הכנס רחוב ומספר בית"
          mode='outlined'
          setValue={setuserOrderStreetNameAndNumber}
          style={styles.input}
        />
        <CustomInput
          maxLength={10}
          keyboardType='numeric'
          placeholder="הכנס טלפון"
          mode='outlined'
          setValue={setuserOrderPhone}
          style={styles.input}
        />
        <FAB
          small
          icon="plus"
          disabled={userOrderStreetNameAndNumber && userOrderPhone != '' ? false : true}
          onPress={() => onSaveAdress()}
        />
      </View>
    </>
  )
}
export default AddNewAdress;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    alignItems: 'center',

  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 50,
    color: COLORS.green,

  },
  input: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.green,
    margin:20,

  },
  fab: {
    position: 'absolute',
    margin: 20,
    right: 0,
    bottom: 0,
    backgroundColor: '#99FFFF'
  }
})