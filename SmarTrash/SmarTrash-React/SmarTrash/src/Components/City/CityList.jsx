import { Picker, StyleSheet } from 'react-native'
import React,{ useState,useEffect,useContext } from 'react'
import { GlobalContext } from '../../../GlobalContext/GlobalContext'


const apiUrlGetCities = 'http://proj.ruppin.ac.il/bgroup91/prod/api/Registration';

const CityList=(props)=> {
  const {setCities,cities,setSelectedCity,selectedCity} = useContext(GlobalContext);
  const handleChange=(itemValue)=>{
    setSelectedCity(itemValue)
  }
useEffect (() => {
  fetch(apiUrlGetCities, {
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/json; charset-UTF-8',
      'Accept': 'application/json; charset-UTF-8',
    })
  })
    .then(response => { return response.json() })
    .then(data => {
      setCities(data)
    });

  }, []);
  
  return (
    <Picker
    selectedValue={selectedCity}
    style={{ height: 50, width: 190}}
    onValueChange={(itemValue) => handleChange(itemValue)}>
        {cities.map((city) => {
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