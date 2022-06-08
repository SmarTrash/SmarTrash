import { View, Dimensions, StyleSheet } from 'react-native'
import React, { useContext } from 'react'


const BinListScreen = () => {
  const [bins,setBins]=useState()
 
  useEffect(() => {
    
    const url = 'http://proj.ruppin.ac.il/bgroup91/prod/api/BinSearch/GetBin';
    fetch(url, {
      method: 'POST',
      body: { UserEmail: userEmail },
      headers: new Headers({
        'Content-type': 'application/json; charset=UTF-8',
        'Accept': 'application/json; charset-UTF-8'
      })
    }).then(response => response.json())
      .then(data => {
        console.log("דאטה", { data })

       const bins= data.map(bin=>{
          return {
            ...bin,
            dis:''
          }
        })
        setBins(data)
      });
  }, [])
  return (
    <View >

    </View>

  )
}

export default BinListScreen

const styles = StyleSheet.create({

})