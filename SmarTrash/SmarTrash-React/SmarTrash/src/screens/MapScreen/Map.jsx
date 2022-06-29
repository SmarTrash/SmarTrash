import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import MapView, { Callout } from 'react-native-maps';
import { Marker, Polyline } from 'react-native-maps';
import * as Location from "expo-location";
import { GlobalContext } from '../../../GlobalContext/GlobalContext';
import { Feather, Ionicons } from '@expo/vector-icons';
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
  const [colorPolyline, setColorPolyline] = useState('')
  const { width } = Dimensions.get('screen');
 

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
        console.log("דאטההההה", data[0].CityId)
        // alert(data[0].CityId)
        if (data) {

          setMarkers(data)

        }
      });
  }, []);

  const createPolyline = async (marker) => {
    console.log('markerrrrr', marker);
    console.log('theColorCode', COLORS[`${marker.BinTypeColor}`]);
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
      {/* <View style={styles.header}> */}
        {/* <View style={styles.back}>
          <Ionicons name="ios-chevron-back" size={30} color="black" onPress={() => navigation.navigate('Home')} />
        </View> */}
        <View style={styles.Listbtn}>
          <Feather name="list" size={40} color="black" onPress={() => navigation.navigate('BinListScreen')} />
        </View>
      {/* </View> */}


      <MapView

        showsUserLocation={true}
        style={{ flex: 1, width:width, }}
        region={{
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
          latitudeDelta: 0.0122,
          longitudeDelta: 0.0121,
        }}>

        {!!points.length && <Polyline
          coordinates={points}
          strokeColor={colorPolyline} // fallback for when `strokeColors` is not supported by the map-provider
          // strokeColors={[
          //   '#7F0000',
          //   '#00000000', // no color, creates a "long" gradient between the previous and next coordinate
          //   '#B24112',
          //   '#E5845C',
          //   '#238C23',
          //   '#7F0000'
          // ]}
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

  
  },
  // header: {
  //   // flexDirection: 'row',
  //   // backgroundColor:COLORS.white,
  //   // marginBottom:15
  //   },
  // back: {
  //   marginRight: 305,
  //   marginTop:40,
  //   marginLeft:10
  // },
  Listbtn: {
    alignContent: 'center',
    alignItems: 'center',
    // justifyContent: 'center',
    alignSelf: 'flex-start',
    height: 50,
    width: 50,
    borderRadius: 10,
    top: 20,
    backgroundColor: COLORS.green,
    marginTop:20,
    marginLeft:10,
  },


});
export default MapScreen