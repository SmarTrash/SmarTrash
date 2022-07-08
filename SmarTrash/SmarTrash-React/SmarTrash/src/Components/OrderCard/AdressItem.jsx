import { Dimensions, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useContext, useState } from 'react'
import COLORS from '../../Consts/colors';
import { GlobalContext } from '../../../GlobalContext/GlobalContext'

const { width } = Dimensions.get('screen');
const cardWidth = width / 1.06;

const AdressItem = ({ specificAdres }) => {
  const [pressed, setPressed] = useState(specificAdres);
  const { specificAdress, setSpecificAdress } = useContext(GlobalContext);
  setSpecificAdress(specificAdres)
  const setAdress = () => {
    if (pressed) {
      setPressed(false),
        setSpecificAdress("")
    } else {
      setSpecificAdress(specificAdres),
        setPressed(specificAdres.id)
    }
  }

  return (
    <TouchableOpacity onPress={() => { setAdress() }}>
      <View style={style.container}>
        <View style={[style.orderCard, { borderColor: pressed == specificAdress ? COLORS.green : COLORS.white }]} >
          <Text style={style.txtGiftName}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'left', marginRight: 30 }}>
              {specificAdres.id == "0" ? "כתובת ברירת מחדל" : "כתובת: " + specificAdres.id}
            </Text>
            {'\n' + specificAdres.S + '\n' + specificAdres.P + '\n' + specificAdres.userCityName}
          </Text>
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
    borderWidth:3,
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
    marginRight: 20,
  },
  txtGiftName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.dark,
    textAlign: 'left',
    marginLeft: 10,
    margin: 15
  },
});
export default AdressItem;