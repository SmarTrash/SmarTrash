import { View,Picker, StyleSheet } from 'react-native'
import React,{ useState } from 'react'

import City from './City'



const CityList=(props)=> {
  
  const [selectedValue, setSelectedValue] = useState();

  return (
    <Picker
    selectedValue={selectedValue}
    style={{ height: 50, width: 150 }}
    onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}>
      {props.cities.map(city => {
      return <City  key={city["CityId"]} CityId={city["CityId"]} CityName={city["CityName"]} />
      })}
 </Picker>

   
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    alignItems: "center"
  }
})
export default  CityList