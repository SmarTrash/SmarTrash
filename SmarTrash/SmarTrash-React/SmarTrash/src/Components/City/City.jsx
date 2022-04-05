import { View, Picker, StyleSheet } from 'react-native'
import React from 'react'



const City = (props) => {
  console.clear();
  const onPressed = () => {
    console.log("done")
  }
  return (

    <Picker.Item key={props.key} label={props.CityName} value={props.CityId} onPressed={onPressed} />
  )
}
const styles = StyleSheet.create({

})
export default City