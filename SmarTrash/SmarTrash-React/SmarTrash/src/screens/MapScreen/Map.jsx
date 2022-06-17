import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import { Marker, Polyline } from 'react-native-maps';
import * as Location from "expo-location";
import { GlobalContext } from '../../../GlobalContext/GlobalContext';
import { Feather, } from '@expo/vector-icons';
import COLORS from '../../Consts/colors';
import { useNavigation } from '@react-navigation/native';


const MapScreen = () => {

  const navigation = useNavigation();
  // export default function MapScreen({ navigation }) {

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
        <View style={styles.listBtnContainer}>
          <View style={styles.Listbtn}>
            <Feather name="list" size={30} color="black" onPress={() => navigation.navigate('BinListScreen')} />
          </View>
        </View>



        <Polyline
          coordinates={[
            //{ latitude:32.803677, longitude: 35.084886},
            //{ latitude: 32.803731, longitude: 35.086034 },
            //{ latitude:32.804219, longitude: 35.081678 },
            { latitude: 32.69715, longitude: 35.15716 },
            { latitude: 32.69727, longitude: 35.15712 },
            { latitude: 32.69773, longitude: 35.15682 },
            { latitude: 32.69789, longitude: 35.15675 },
            { latitude: 32.69813, longitude: 35.15673 },
          ]}
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
        />
        {markers &&
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