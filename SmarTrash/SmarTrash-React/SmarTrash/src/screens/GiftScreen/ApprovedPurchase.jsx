import { View, Text, StyleSheet, Image, Dimensions } from 'react-native'
import React from 'react'
import COLORS from '../../Consts/colors'
import { MaterialIcons } from '@expo/vector-icons';
import CustonButton from '../../Components/CustomButton/CustonButton';

const { width } = Dimensions.get('screen');


export default function ApprovedPurchase({navigation, route}) {
  const points = route.params;
  return (
    <View style={styles.container}>

      <View style={styles.txtContainer}>
        <Text style={styles.txt} >ההטבה בדרך אליך !</Text>
      </View>

      <View style={styles.imgContainer}>
        <Image
          style={styles.image}
          source={{ uri: 'https://cdn5.vectorstock.com/i/1000x1000/31/19/green-delivery-logo-icon-design-vector-22483119.jpg' }} />
      </View>


      <View style={{ flexDirection: 'row-reverse', width }}>
        <View>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: COLORS.dark, alignSelf: 'flex-start', margin: 20 }}>
            {'סה"כ נקודות שנשארו לך:'}
          </Text>
        </View>

        <View style={{ marginRight: 50 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: COLORS.dark, alignSelf: 'flex-start', margin: 20 }}>
            {3200}  <MaterialIcons name="stars" size={24} color={COLORS.gold}  style={styles.starIcon}/>
          </Text>
          {/* להכניס מהפצ' את הנקודות שנשארו (במקום 3200 לשים points) */}
        </View>
      </View>

      <View style={{marginTop:50}}>
        <CustonButton   
        text="סיים"
        onPress={()=> navigation.navigate('GiftsPage')} 
        />
      </View>

    </View>

  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    flexDirection: 'column',
    // alignItems: 'center',
    alignSelf: 'center',
  },
  txt: {
    fontFamily: 'HelveticaNeue',
    color: COLORS.dark,
    fontSize: 30,
    fontWeight: 'bold',
  },
  txtContainer: {
    marginTop: 150,

  },

  image: {
    flex: 1,
    width: undefined,
    height: undefined,
    marginTop: 90,


  },
  imgContainer: {
    width: 300,
    height: 300,
    borderRadius: 100,
    overflow: 'hidden',

  },
  txtPoints: {
    fontSize: 20,
    margin: 10,
    textAlign: 'right',
  },
  starIcon:{
    marginTop:10,
  },

})