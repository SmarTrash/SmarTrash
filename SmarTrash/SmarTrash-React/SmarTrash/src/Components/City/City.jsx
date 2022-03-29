import { View, Picker, StyleSheet } from 'react-native'
import React from 'react'
import { useState, useEffect } from 'react';

const apiUrl = 'http://proj.ruppin.ac.il/bgroup91/prod/api/Registration';

const City=() =>{
  const [cities, setCities] = useState([]);
  const [cityId, setCityId] = useState();
  const [cityName, setCityName] = useState();

  useEffect(() => {
    fetch(apiUrl, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json; charset-UTF-8',
        'Accept': 'application/json; charset-UTF-8',
      })
    })
      .then(response => { return response.json() })
      .then(data => setCities(data));
       console.log(cities)
    return () => {
      // cleanup
    }
  }, []);

 const onPressed =()=>{

 }
  return (
    <View style={styles.container}>
    <Picker style={{ height: 50, width: 150 }}>

      <Picker.Item label={cities.CityName} value={cities.CityId} onPress={onPressed} />
    
    </Picker>
  </View>

  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    alignItems: "center"
  }
})
export default  City