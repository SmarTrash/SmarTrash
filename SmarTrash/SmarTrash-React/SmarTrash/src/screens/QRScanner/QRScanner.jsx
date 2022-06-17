import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button ,Alert} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import COLORS from '../../Consts/colors';
import CustonButton from '../../Components/CustomButton/CustonButton';

const apiUrl = 'http://proj.ruppin.ac.il/bgroup91/prod/api/BinSearch/MatchBin';

const QRScanner = ({ navigation }) => {

  // const CheckBin = () => {
  //   fetch(apiUrl, {
  //     method: 'POST',
  //     body: JSON.stringify({ BinQRId: text }),
  //     headers: new Headers({
  //       'Content-type': 'application/json; charset=UTF-8',
  //       'Accept': 'application/json; charset-UTF-8'

  //     })
  //   }).then(response => { return console.log('response'), response.json() })
  //     .then(data => {
  //       console.log('QRBIN', data)
  //       navigation.navigate('')

  //     });
  // }


  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState('Not yet scanned')

  useEffect(() => {
    fetch(apiUrl, {
      method: 'POST',
      body: JSON.stringify({ BinQRId: text }),
      headers: new Headers({
        'Content-type': 'application/json; charset=UTF-8',
        'Accept': 'application/json; charset-UTF-8'

      })
    }).then(response => { return console.log('response'), response.json() })
      .then(data => {
        console.log('QRBIN', data)
        if (data == true){
          
            navigation.navigate('ReceptBin')
        }
      
      });
  }, [text]);


  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })()
  }
  // Request Camera Permission
  useEffect(() => {
    askForCameraPermission();
  }, []);

  // What happens when we scan the bar code
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setText(data)
    console.log('Type: ' + type + '\nData: ' + data)
  };

  // Check permissions and return the screens
  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting for camera permission</Text>
      </View>)
  }
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={{ margin: 10 }}>No access to camera</Text>
        <Button title={'Allow Camera'} onPress={() => askForCameraPermission()} />
      </View>)
  }

  // Return the View
  return (
    <View style={styles.container}>
<View style={{marginTop:2}}>
<Text style={styles.header}>אנא סרוק את הQR</Text>
</View>

      <View style={styles.barcodebox}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{ height: 400, width: 400 }} />
      </View >
      {/* <Text style={styles.maintext}>{text}</Text>  */}
<View style={{marginTop: 50 , borderRadius:30 , padding:12}}>
    {scanned && <Button title={'לא תקין, אנא סרוק שוב QR'} onPress={() => setScanned(false)} color='black'   />} 

</View>
     
    </View>
  );
}

export default QRScanner


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  maintext: {
    fontSize: 16,
    margin: 20,
  },
  barcodebox: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
    width: 300,
    overflow: 'hidden',
    borderRadius: 30,
    backgroundColor: 'tomato'
  },
  header: {
    fontSize: 16,
    margin: 20,
    fontSize:20,
    color:COLORS.green,
  },
});