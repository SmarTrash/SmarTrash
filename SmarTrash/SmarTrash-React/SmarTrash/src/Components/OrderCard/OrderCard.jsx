import { Dimensions, StyleSheet, Text, View, } from 'react-native';
import COLORS from '../../Consts/colors';
import React from 'react'
import moment from 'moment';
const { width } = Dimensions.get('screen');
const cardWidth = width / 1.06;

const OrderCard = ({ index, orders }) => {

  return (
    <View style={style.container}>
      <View style={style.orderCard}>
        <View style={style.orderCardContent}>
          <Text style={style.txtGiftName}>
            {orders["giftName"] + '\n' + orders["brand"]}
          </Text>
          <View style={{ flex: 1, }}>
            <Text style={style.txtOrderDate}>
              {moment(new Date(orders["orderDate"])).format('DD/MM/YYYY')}
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
    height: 80,
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
    justifyContent: 'center'
  },
  txtGiftName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.dark,
    alignSelf: 'flex-start',
    textAlign: 'left',
    margin: 20,
  },
  txtOrderDate: {
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.dark,
    alignSelf: 'flex-end',
    textAlign: 'left',
    marginTop: 20,
    marginRight: 15
  },
});
export default OrderCard;