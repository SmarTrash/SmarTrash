import { Picker } from 'react-native'
import React, { useEffect, useContext } from 'react'
import { GlobalContext } from '../../../GlobalContext/GlobalContext'

const apiUrlGetCities = 'http://proj.ruppin.ac.il/bgroup91/prod/api/Registration';

const CityList = () => {
  const { setCities, cities, setSelectedCity, selectedCity, setUserCityName } = useContext(GlobalContext);
  const handleChange = (itemValue) => {
    setSelectedCity(itemValue.id)
    setUserCityName(itemValue.name)
  }
  useEffect(() => {
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
      style={{ height: 50, width: 190 }}
      onValueChange={(itemValue) => handleChange(itemValue)}>
      {cities.map((city) => {
        return <Picker.Item key={city.CityId} label={city.CityName} value={{ id: city.CityId, name: city.CityName }} />
      })}
    </Picker>


  )
}

export default CityList