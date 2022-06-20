import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import { Marker, Polyline } from 'react-native-maps';
import * as Location from "expo-location";
import { GlobalContext } from '../../../GlobalContext/GlobalContext';
import { Feather, } from '@expo/vector-icons';
import COLORS from '../../Consts/colors';
import { useNavigation } from '@react-navigation/native';
import { tomtomService } from '../../services/tomtom.service';


const MapScreen = () => {

  const navigation = useNavigation();
  // export default function MapScreen({ navigation }) {

  const { userEmail } = useContext(GlobalContext);
  const [markers, setMarkers] = useState([])
  const [userLocation, setUserLocation] = useState({
    latitude: 32.15715,
    longitude: 34.843893
  });
  const [points, setPoints] = useState([])

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

  const createPolyline = async (marker) => {
    console.log({ marker });
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
      <View style={styles.listBtnContainer}>
        <View style={styles.Listbtn}>
          <Feather name="list" size={30} color="black" onPress={() => navigation.navigate('BinListScreen')} />
        </View>
      </View>
      <MapView

        showsUserLocation={true}
        style={{ flex: 1, width: Dimensions.get('window').width - 10, }}
        region={{
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
          latitudeDelta: 0.0122,
          longitudeDelta: 0.0121,
        }}>


        {!!points.length && <Polyline
          coordinates={points}
          strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
          strokeColors={[
            '#7F0000',
            '#00000000', // no color, creates a "long" gradient between the previous and next coordinate
            '#B24112',
            '#E5845C',
            '#238C23',
            '#7F0000'
          ]}
          strokeWidth={6}
        />}
        {markers &&
          markers.map((marker) => {
            return <Marker
              onPress={() => createPolyline(marker)}
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
      </MapView>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  // listBtnContainer:{
  //   margin: 10
  // },

  Listbtn: {
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: 45,
    borderRadius: 10,
    backgroundColor: COLORS.primary,
  },


});
export default MapScreen