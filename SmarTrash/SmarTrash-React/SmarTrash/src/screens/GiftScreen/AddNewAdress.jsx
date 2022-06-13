import React, { useState,useContext } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { FAB, TextInput } from 'react-native-paper'
import CustomInput from '../../Components/CustomInput/CustomInput'
import { GlobalContext } from '../../../GlobalContext/GlobalContext'
import CityList from '../../Components/City/CityList'

const AddNewAdress = ({ navigation, route }) => {

  const { userEmail, setUserEmail,
    setUserCityId,userCityName, setUserCityName,
    setUserStreetNameAndNumber,userStreetNameAndNumber,
    setUserImg, userImg,
    userCityId, } = useContext(GlobalContext);

  const [noteTitle, setNoteTitle] = useState('');
  const [noteDetails, setNoteDetails] = useState('');

  const onSaveNote = () => {
    console.log(userCityId, userStreetNameAndNumber)
    route.params.addNotes({ userCityId, userStreetNameAndNumber });
    navigation.goBack();
  }


  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>הוסף כתובת</Text>

        <CityList />

        <CustomInput
          placeholder="הכנס רחוב ומספר בית"
          mode='outlined'
          setValue={setUserStreetNameAndNumber}
          style={styles.title}
        />

        <FAB 
          small
          icon="check"
          disabled={noteTitle == '' ? true : false}
          onPress={() => onSaveNote()}
        />
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