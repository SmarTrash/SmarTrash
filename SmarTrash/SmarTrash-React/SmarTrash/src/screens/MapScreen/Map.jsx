import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import { Polyline } from 'react-native-maps';
import * as Location from "expo-location";
import { GlobalContext } from '../../../GlobalContext/GlobalContext';
import COLORS from '../../Consts/colors';
import { tomtomService } from '../../services/tomtom.service';

const MapScreen = () => {

  const { userEmail } = useContext(GlobalContext);
  const [markers, setMarkers] = useState([])
  const [userLocation, setUserLocation] = useState({
    latitude: 32.15715,
    longitude: 34.843893
  });
  const [points, setPoints] = useState([])
  const [colorPolyline, setColorPolyline] = useState('')
  const { width } = Dimensions.get('screen');


  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
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
        if (data) {

          setMarkers(data)

        }
      });
  }, []);

  const createPolyline = async (marker) => {
    setColorPolyline(COLORS[`${marker.BinTypeColor}`]);
    const locations = [
      {
        lat: userLocation.latitude,
        lon: userLocation.longitude,
      },
      {
        lat: marker.Latitude,
        lon: marker.Longitude,
      },
    ]
    const res = await tomtomService.getRoute(locations)
    if (res.data) {
      setPoints(res.data?.routes[0].legs[0]?.points || [])
    }
  }
  return (
    <View style={styles.container}>
      <MapView

        showsUserLocation={true}
        style={{ flex: 1, width: width, }}
        region={{
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
          latitudeDelta: 0.0122,
          longitudeDelta: 0.0121,
        }}>

        {!!points.length && <Polyline
          coordinates={points}
          strokeColor={colorPolyline}
          strokeWidth={4}
        />}
        {markers &&
          markers.map((marker) => {
            return <MapView.Marker
              onPress={() => createPolyline(marker)}
              key={marker.BinQRId}
              coordinate={
                {
                  latitude: marker.Latitude,
                  longitude: marker.Longitude
                }
              }
              pinColor={COLORS[`${marker.BinTypeColor}`]}
            >

              <MapView.Callout>
                <View style={{ height: 100, width: 200 }}>
                  <Text> {marker.Address} </Text>
                  <Text> {marker.Description}</Text>
                </View>
              </MapView.Callout>
            </MapView.Marker>
          })
        }
      </MapView>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    alignItems: 'center'
  },
});
export default MapScreen