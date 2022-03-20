import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'


const CustonButton = ({ onPress, text, type = "Primary", bgColor, fgColor }) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.container,
        styles[`container_${type}`],
        bgColor ? { backgroundColor: bgColor } : {}
      ]}>
      <Text
        style={[
          styles.text,
          styles[`text_${type}`],
          fgColor ? { color: fgColor}:{}
        ]}>{text}</Text>
    </Pressable>
  );
};
export default CustonButton;

const styles = StyleSheet.create({

  container: {
    width: '100%',
    padding: 15,
    marginVertical: 10,
    alignItems: 'center',
    borderRadius: 5
  },
  container_Primary: {
    backgroundColor: '#3B71F3',
  },
  container_TERTIARY: {

  },
  text: {
    fontWeight: 'bold',
    color: 'white'

  },
  text_TERTIARY: {
    color: 'gray'
  }

})
