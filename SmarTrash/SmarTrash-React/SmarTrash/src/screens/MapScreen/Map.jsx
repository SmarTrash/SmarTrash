import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import * as Location from "expo-location";

export default function MapScreen() {

  const [userLocation , setUserLocation] = useState({
    latitude:32.15715,
    longitude:34.843893
  });

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        //setErrorMsg('Permission to access location was denied');
        console.log('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      //setLocation(location);
      console.log(location);
      setUserLocation({
        latitude:location.coords.latitude,
        longitude: location.coords.longitude
      })

    })();
  }, []);

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

        <Marker
          coordinate={
            {
              latitude: 32.15715,
              longitude: 34.843893
            }
          }
          title='הפח הכתום'
          description='רחוב ברנר הרצליה'
          pinColor='#FF8D29'
        />


        <Marker
          coordinate={
            {
              latitude: 32.158603,
              longitude: 34.846565
            }
          }
          title='הפח הסגול'
          description='ההסתדרות 29 הרצליה'
          pinColor='#541690'
        />
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