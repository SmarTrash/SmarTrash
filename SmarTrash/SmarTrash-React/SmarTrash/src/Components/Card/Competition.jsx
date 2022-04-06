import { View, Text } from 'react-native'
import React,{useEffect,useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
const apiUrl = 'http://proj.ruppin.ac.il/bgroup91/prod/api/Competition/GetListOfUsersInMyCity';


const Competition = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  useEffect(() => {
    onLoud();
    }, []);

  
  const onLoud = () => {
    fetch(apiUrl, {
      method: 'GET',
      body: JSON.stringify(),
      headers: new Headers({
        'Content-type': 'application/json; charset=UTF-8',
        'Accept': 'application/json; charset-UTF-8'

      })
    }).then(response => { return response.json() })
      .then(data => {
        console.log("dataaaaaa:", data);
        setGiftData(data);

      });
  }
  return (
    <View>
      <Text>Competition</Text>
    </View>
  )
}

export default Competition