import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import COLORS from '../../Consts/colors';
const Notifications = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text>Notifications</Text>
      </View>
    </View>
  )
}

export default Notifications


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 16,
    margin: 20,
    fontSize:20,
    color:COLORS.green,
  },
});