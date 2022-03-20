import { View, Text, StyleSheet,TextInput } from 'react-native'
import React from 'react'


const CustomInput=({value, setValue,placeholder,secureTextEntry})=> {
  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={setValue}
        styles={styles.input}
        placeholder={placeholder} 
        secureTextEntry={secureTextEntry}/>
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
  input: {}

})