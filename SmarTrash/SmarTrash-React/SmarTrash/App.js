import { View, Text,StyleSheet } from 'react-native'
import React,{useEffect,useState} from 'react'
import Navigation from './src/Components/Navigation';
import {Provider} from './GlobalContext/GlobalContext';
import LoginLoader from './src/Components/Loader/LoginLoader';
{/* setLoading(false) */}
export default function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(async() => {
       setLoading(false);
     
    }, 4000);
    setLoading(true);
  }, []);
  
  return (
    <Provider>
  
    <View style={styles.root} > 
       {/* {loading?<LoginLoader visible={loading}/>:null} */}
      <Navigation/>
    </View>
    
    </Provider>
    
  )
}

const styles=StyleSheet.create({
  root:{
    flex:1,
    backgroundColor: '#F9FBFC'

  }
})