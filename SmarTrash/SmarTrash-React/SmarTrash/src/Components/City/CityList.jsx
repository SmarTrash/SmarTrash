import { Picker, StyleSheet } from 'react-native'
import React,{ useState } from 'react'




const CityList=(props)=> {
 
  const [selectedValue, setSelectedValue] = useState();
  const handleChange=(itemValue)=>{
    setSelectedValue(itemValue)
    props.onChange(itemValue);
    
  }
  return (
    <Picker
    selectedValue={selectedValue}
    style={{ height: 50, width: 190}}
    onValueChange={(itemValue) => handleChange(itemValue)}>
        {props.cities.map((city) => {
            return <Picker.Item  key={city.CityId} label={city.CityName} value={city.CityId}  />
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