import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import * as Location from "expo-location";
import { GlobalContext } from '../../../GlobalContext/GlobalContext';

export default function MapScreen({ navigation }) {
  const { userEmail } = useContext(GlobalContext);
  const [markers, setMarkers] = useState([])
  const [userLocation, setUserLocation] = useState({
    latitude: 32.15715,
    longitude: 34.843893
  });

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        //setErrorMsg('Permission to access location was denied');
        console.log('Permission to access location was denied');
        // navigation.navigate('')
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      //setLocation(location);
      console.log(location);
      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      })
    })();
    const url = 'http://proj.ruppin.ac.il/bgroup91/prod/api/BinSearch/GetBin';
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({ UserEmail: userEmail }),
      headers: new Headers({
        'Content-type': 'application/json; charset=UTF-8',
        'Accept': 'application/json; charset-UTF-8'
      })
    }).then(response => response.json())
      .then(data => {
        console.log("דאטה", { data })
        console.log("דאטה", data[0].CityId)
        // alert(data[0].CityId)
        if (data) {

          setMarkers(data)

        }
      });
  }, []);


  // let stam = markers.map((marker) => {
  //   return <Marker
  //     coordinate={
  //       {
  //         latitude: marker.Latitude,
  //         longitude: marker.Longitude
  //       }
  //     }
  //     title='avi'//{marker.BinTypeId}
  //     description='avi'//{marker.Address}
  //     pinColor='#FF8D29'
  //   />
  // });

  //alert(JSON.stringify(stam[0])[0]);

  return (
    <View style={styles.container}>

      <MapView
        showsUserLocation={true}
        style={{ flex: 1, width: Dimensions.get('window').width - 10, }}
        region={{
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
          latitudeDelta: 0.0122,
          longitudeDelta: 0.0121,
        }}>
        {markers&&
          markers.map((marker) => {
            return <Marker
            key={marker.BinQRId}
              coordinate={
                {
                  latitude: marker.Latitude,
                  longitude: marker.Longitude
                }
              }
              title={marker.Address}
              description={marker.Address}
              pinColor='#FF8D29'
            />
          })
        }
        {/* <Marker
          coordinate={
            {
              latitude: 32.15715,
              longitude: 34.843893
            }
          }
          title='avi'//{marker.BinTypeId}
          description='avi'//{marker.Address}
          pinColor='#FF8D29'
        /> */}
      </MapView>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
});