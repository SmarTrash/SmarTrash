import { View, StyleSheet,TextInput } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CustomInput=({value, setValue,placeholder,secureTextEntry,icon})=> {
  
  return (
    <View style={styles.container}>
      <Icon 
      name={icon}
      style={styles.icon}/>
      <TextInput
        value={value}
        onChangeText={setValue}
        styles={styles.input}
        placeholder={placeholder} 
        secureTextEntry={secureTextEntry}
        />
    </View>
  )
}

export default CustomInput;
const styles = StyleSheet.create({

  container: {
    backgroundColor: 'white',
    width: '100%',
    borderColor: '#e88e8e',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10

  },
  input: {},
  icon:{
    fontSize:10,
    color: '#e88e8e',
    marginRight:10
  }

})