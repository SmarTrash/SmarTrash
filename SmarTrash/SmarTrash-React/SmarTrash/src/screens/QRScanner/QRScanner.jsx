import React, { useState, useEffect, useContext } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import COLORS from '../../Consts/colors';
import { GlobalContext } from '../../../GlobalContext/GlobalContext';

const apiUrl = 'http://proj.ruppin.ac.il/bgroup91/prod/api/BinSearch/MatchBin';

const QRScanner = ({ navigation }) => {

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const { binQRId, setBinQRId } = useContext(GlobalContext);

  useEffect(() => {
    fetch(apiUrl, {
      method: 'POST',
      body: JSON.stringify({ BinQRId: binQRId }),
      headers: new Headers({
        'Content-type': 'application/json; charset=UTF-8',
        'Accept': 'application/json; charset-UTF-8'

      })
    }).then(response => { return console.log('response'), response.json() })
      .then(data => {
        console.log('QRBIN', data)
        if (data == true) {
        
          console.log('binQRId', binQRId);
          navigation.navigate('ReceptBin')
        }
      });
  }, [binQRId]);



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
    setBinQRId(data)
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

  return (
    <View style={styles.container}>
      <View style={{ marginTop: 2 }}>
        <Text style={styles.header}>אנא סרוק את הQR</Text>
      </View>

      <View style={styles.barcodebox}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{ height: 400, width: 400 }} />
      </View >
      <View style={{ marginTop: 50, borderRadius: 30, padding: 12 }}>
        {scanned && <Button title={' אנא סרוק שוב'} onPress={() => setScanned(false)} color='black' />}

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
    fontSize: 20,
    color: COLORS.green,
  },
});