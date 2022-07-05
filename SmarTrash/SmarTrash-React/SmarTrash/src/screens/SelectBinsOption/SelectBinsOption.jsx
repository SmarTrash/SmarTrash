import { View, StyleSheet, Text, Image,} from 'react-native';
import React , {useContext} from 'react';
import COLORS from '../../Consts/colors';
import { GlobalContext } from '../../../GlobalContext/GlobalContext';
import CustonButton from '../../Components/CustomButton/CustonButton';
import { Feather } from '@expo/vector-icons'; 

const SelectBinsOption = ({ navigation }) => {
    const { userImg } = useContext(GlobalContext);
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white, }}>
    <View style={{ alignSelf: 'center', alignItems: 'center', flexDirection: 'column' }}>
      <View style={styles.profileImage}>
        <Image
          style={styles.image}
          source={{ uri: userImg }} />
      </View>
      <View style={{alignItems: 'center',alignSelf: 'center'}}>
      <Text style={{ fontSize: 25, fontWeight: 'bold', color: COLORS.green, top: 60, margin: 5 }}>
        הפחים בעיר שלך 
      </Text>
      <Text style={{ fontSize: 15, fontWeight: 'bold', color: COLORS.green, top: 200, margin: 5 }}>
       בחר איך תרצה לראות את הפחים
      </Text>
      </View>
      <View style={styles.buttons}>
          <CustonButton
            text='מפה'
            onPress={() => navigation.navigate('Map')} />
            
      <CustonButton
            text='רשימה'
            onPress={() => navigation.navigate('BinListScreen')} />
            </View>
    </View>
  </View>
  
  )
}

export default SelectBinsOption


const styles = StyleSheet.create({
    profileImage: {
      width: 80,
      height: 80,
      top: 60,
      alignSelf: 'center',
      borderRadius: 100,
      overflow: 'hidden',
    },
    image: {
      flex: 1,
      width: undefined,
      height: undefined,
    },
    buttons:{
marginTop:220,

// alignSelf: 'center',
    },
})