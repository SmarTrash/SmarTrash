import { ColorPropType, Dimensions, StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import React,{useContext,useState} from 'react'
import COLORS from '../../Consts/colors';
import { GlobalContext } from '../../../GlobalContext/GlobalContext'



const { width } = Dimensions.get('screen');
const cardWidth = width / 1.06;


const AdressItem = ({ specificAdres }) => {
  const [pressed, setPressed] = useState(false);

  const { userEmail, userImg, selectedCity, setUserPoints, specificAdress, setSpecificAdress } = useContext(GlobalContext);
  console.log('list order', specificAdres);
  return (
    <TouchableOpacity onPress={() =>{ setSpecificAdress(specificAdres), setPressed(true)}}>
    <View style={style.container}>
        <View style={style.orderCard} >
          <View style={style.orderCardContent}>
            <Text style={style.txtGiftName}>
            {specificAdres.id == "0" ? "כתובת ברירת מחדל" : "כתובת: " + specificAdres.id }
            { '\n'+specificAdres.S+'\n'+specificAdres.P+'\n'+specificAdres.userCityName}   
            </Text>
        
          </View>
        </View>
    

    </View>
</TouchableOpacity>

  );
};



const style = StyleSheet.create({
  container: {
    alignItems: 'center',

  },
  orderCard: {
    height: 120,
    width: cardWidth,
    backgroundColor: COLORS.white,
    margin: 15,
    elevation: 15,
    borderRadius: 10,
    shadowColor: COLORS.dark,
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    marginRight: 30,

  },
  orderCardContent: {
    flexDirection: 'row',

  },
  txtGiftName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.dark,
    alignSelf: 'flex-start',
    margin: 10,
  },
  txtOrderDate: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.dark,
    alignSelf: 'flex-end',
    textAlign: 'left',
    margin: 20,
  },

});
export default AdressItem;