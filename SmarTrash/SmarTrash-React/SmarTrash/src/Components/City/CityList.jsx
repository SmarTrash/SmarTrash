import { View, Text } from 'react-native'
import React from 'react'
import City from './City'

const CityList=(props)=> {
  return (
    <View>
      <Text>
      {props.cities.map(city => {
      return <City key={city.id} name={city.name} 
      />
      })}

      </Text>
    </View>
  )
}
export default  CityList