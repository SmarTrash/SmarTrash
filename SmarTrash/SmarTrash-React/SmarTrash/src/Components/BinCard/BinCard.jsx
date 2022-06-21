import { ColorPropType, Dimensions, StyleSheet, Text, View, } from 'react-native';
import React from 'react'
import COLORS from '../../Consts/colors';




const { width } = Dimensions.get('screen');
const cardWidth = width / 1.06;


const BinCard = ({ index, bins }) => {
  const c = bins["BinTypeColor"];
  const color = COLORS[`${c}`];
  console.log('colorrrrgggg', color);

  console.log('list bin', bins);
  return (
    <View style={style.container}>
    
   
        <View style={style.binCard}>
          <View style={style.binCardContent}>
            <Text style={style.txtName}>

              {bins["Address"]}
            </Text>
            <View style={{ flex: 1, }}>
              <Text style={style.txtPoint}>
                {bins["CityId"]}
                {'  '}
              </Text>
            </View>

          </View>
        </View>
    

    </View>


  );
};



const style = StyleSheet.create({
  container: {
    alignItems: 'center',

  },
  binCard: {
    height: 70,
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
  binCardContent: {
    flexDirection: 'row',

  },
  txtName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.dark,
    alignSelf: 'flex-start',
    margin: 20,
  },
  txtPoint: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.dark,
    alignSelf: 'flex-end',
    textAlign: 'left',
    margin: 20,
  },

});
export default BinCard;