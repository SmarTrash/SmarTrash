import { View, StyleSheet, TextInput,Dimensions } from 'react-native'
import React from 'react'

const { width } = Dimensions.get('screen');
const cardWidth = width / 1.2;
const CustomInput = ({ value, setValue, placeholder, secureTextEntry }) => {

  return (
    <View style={styles.container}>

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
    width: cardWidth,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 10,
    marginVertical: 10,
    padding:10
  },
  input: {},


})