import { ColorPropType, Dimensions, StyleSheet, Text, View, } from 'react-native';
import React from 'react'
import COLORS from '../../Consts/colors';




const { width } = Dimensions.get('screen');
const cardWidth = width / 1.06;


const OrderCard = ({ index, shippingDetails }) => {
 
  console.log('list order', shippingDetails);
  return (
    <View style={style.container}>
        <View style={style.orderCard}>
          <View style={style.orderCardContent}>
            <Text style={style.txtGiftName}>
            {shippingDetails["giftName"]}
            </Text>
            <View style={{ flex: 1, }}>
              <Text style={style.txtOrderDate}>
              {shippingDetails["orderDate"]}
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
  orderCard: {
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
  orderCardContent: {
    flexDirection: 'row',

  },
  txtGiftName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.dark,
    alignSelf: 'flex-start',
    margin: 20,
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
export default OrderCard;