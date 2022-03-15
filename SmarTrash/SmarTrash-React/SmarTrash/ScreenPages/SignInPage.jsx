import { StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { FAB, TextInput } from 'react-native-paper'

export default function SignInPage() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <>
      <View style={styles.container}>
        <TextInput
          label="אימייל"
          value={email}
          mode='outlined'
          onChangeText={setEmail}
          style={styles.email}
        />
        <TextInput
          label="סיסמא"
          value={password}
          mode='outlined'
          onChangeText={setPassword}
          style={styles.password}
        />
       
        <FAB style={styles.fab}
          small
          icon="check"
        />
      </View>
    </>
  ) 
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 10

  },
  email: {
    fontSize: 24,
    marginBottom: 16
  },
  password : {
    fontSize: 24,
    marginBottom: 16
  },
  fab: {
    position: 'absolute',
    margin: 20,
    right: 0,
    bottom: 0,
    backgroundColor: '#99FFFF'
  },
})