import { StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { FAB, TextInput } from 'react-native-paper'
import RadioGroup from 'react-native-radio-buttons-group';
import CityList from '../Components/CityList';


export default function RegistrationPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [streetNum, setStreetNum] = useState('');

  const radioButtonsData = [
    {
      id: '1',
      label: 'זכר',
      value: 'M',
      color: '#99FFFF',
      selected: true,
    },
    {
      id: '2',
      label: 'נקבה',
      value: 'F',
      color: '#99FFFF',
      selected: false,
    },
  ];
  const [radioButtons, setRadioButtons] = useState(radioButtonsData);
  const [selectedValue, setSelectedValue] = useState("java");
  const onPressRadioButton = radioButtonsArray => {
    console.log(radioButtonsArray);
    setRadioButtons(radioButtonsArray);
  };
  return (
    <>
      <View style={styles.container}>
        <TextInput
          label="שם פרטי"
          value={firstName}
          mode='outlined'
          onChangeText={setFirstName}
          style={styles.title}
        />
        <TextInput
          label="שם משפחה"
          value={lastName}
          mode='outlined'
          onChangeText={setLastName}
          style={styles.title}
        />
        <RadioGroup
          radioButtons={radioButtons}
          onPress={onPressRadioButton}
          layout="row"
        />
        <CityList Cities={Cities} />
       

        <TextInput
          label="אימייל"
          value={email}
          mode='outlined'
          onChangeText={setEmail}
          style={styles.title}
        />
        <TextInput
          label="סיסמא"
          value={password}
          mode='outlined'
          onChangeText={setPassword}
          style={styles.title}
        />
        <TextInput
          label="טלפון"
          value={phone}
          mode='outlined'
          onChangeText={setPhone}
          style={styles.title}
        />
        <TextInput
          label="רחוב ומספר בית"
          value={streetNum}
          mode='outlined'
          onChangeText={setStreetNum}
          style={styles.title}
        />
        <FAB style={styles.fab}
          small
          icon="check"


        />
      </View>
    </>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 10

  },
  title: {
    fontSize: 24,
    marginBottom: 16
  },
  fab: {
    position: 'absolute',
    margin: 20,
    right: 0,
    bottom: 0,
    backgroundColor: '#99FFFF'
  },
  option: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  },
  unselected: {
    backgroundColor: 'red',
    margin: 5,
  },
  selected: {
    backgroundColor: 'blue',
    margin: 6,
    padding: 10,
    borderRadius: 10,
  },
})
