import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import { Marker, Polyline } from 'react-native-maps';
import * as Location from "expo-location";
import { GlobalContext } from '../../../GlobalContext/GlobalContext';
import { Feather, } from '@expo/vector-icons';
import COLORS from '../../Consts/colors';

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
        <View style={styles.sortBtn}>
          <Feather style={styles.IconList} name="list" size={24} color="black" />
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
            { latitude: 32.69838, longitude: 35.15676 },
            { latitude: 32.69872, longitude: 35.15697 },
            { latitude: 32.69903, longitude: 35.15723 },
            { latitude: 32.69917, longitude: 35.15737 },
            { latitude: 32.69931, longitude: 35.15753 },
            { latitude: 32.69949, longitude: 35.15781 },
            { latitude: 32.69958, longitude: 35.15796 },
            { latitude: 32.69968, longitude: 35.15812 },
            { latitude: 32.69976, longitude: 35.15822 },
            { latitude: 32.69987, longitude: 35.15831 },
            { latitude: 32.69997, longitude: 35.15836 },
            { latitude: 32.69996, longitude: 35.15837 },
            { latitude: 32.69996, longitude: 35.15840 },
            { latitude: 32.69997, longitude: 35.15843 },
            { latitude: 32.69998, longitude: 35.15846 },
            { latitude: 32.70000, longitude: 35.15848 },
            { latitude: 32.70003, longitude: 35.15850 },
            { latitude: 32.70005, longitude: 35.15850 },
            { latitude: 32.70008, longitude: 35.15850 },
            { latitude: 32.70010, longitude: 35.15848 },
            { latitude: 32.70012, longitude: 35.15846 },
            { latitude: 32.70013, longitude: 35.15843 },
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

  sortBtn: {
    height: 30,
    width: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    margin: 5,
    alignContent:'flex-end',
    backgroundColor:COLORS.primary,
  },
  IconList:{
    fontWeight:'bold',
    alignSelf:'center'
  },

});