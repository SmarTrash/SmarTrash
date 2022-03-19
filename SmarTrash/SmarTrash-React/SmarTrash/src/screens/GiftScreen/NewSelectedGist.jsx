import React from 'react';
import {View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import COLORS from '../../consts/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import gifts from '../../consts/gifts';

const NewSelectedGift = ({navigation,route}) => {
  const gifts = <route className="params"></route>
    return (
      <SafeAreaView style={{flex:1, backgroundColor:COLORS.white}}>
        <View style={style.header}>
          <Icon name='arrow-back' size={28} onPress={() => navigation.goBack}/>
        </View>
        <View style={style.imageContainer}>
          <Image source={gifts.img} style={{resizeMode:'contain', flex:1}}/>
        </View>
        <View style={style.detailsContainer}>
          <View style={style.title}>
            <Text style={style.giftName}>{gifts.name}</Text>
            <View style={style.priceTag}>
              <Text style={style.price}>{gifts.Price}</Text>
            </View>
          </View>
          <View style={style.aboutContainer}>
            <Text style={style.about}>About</Text>
            <Text style={style.description}>{gifts.GiftDescription}</Text>
            <View style={style.buyContainer}>
              <View style={style.btnContainer}>
                <View style={style.borderBtn}>
                  <Text style={style.borderBtnText}>-</Text>
                </View>
                <Text style={style.quantity}>1</Text>
                <View style={style.borderBtn}>
                  <Text style={style.borderBtnText}>+</Text>
                </View>
              </View>
              <View style={style.buyBtn}>
                <Text style={style.buyBtnText}>Buy</Text>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
};

const style =  StyleSheet.create({
  header:{
    paddingHorizontal:20,
    marginTop:20,
    flexDirection:'row',
    justifyContent:'space-between',
  },
  imageContainer:{
    flex:0.45,
    marginTop:20,
    justifyContent:'center',
    alignItems:'center',

  },
  detailsContainer:{
      flex:0.55,
      backgroundColor:COLORS.light,
      marginHorizontal:7,
      marginBottom:7,
      borderRadius:20,
      marginTop:30,
      paddingTop:30,
  },
  title:{
    marginLeft:20,
    marginTop:20,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
  },
  giftName:{
    fontSize:22,
    fontWeight:'bold',
  },
  priceTag:{
    backgroundColor:COLORS.green,
    width:80,
    height:40,
    borderTopLeftRadius:25,
    borderBottomLeftRadius:25,
    justifyContent:'center',
  },
  price:{
    marginLeft:15,
    color: COLORS.white,
    fontWeight:'bold',
    fontSize:16,
  },
  aboutContainer:{
    paddingHorizontal:20,
    marginTop:10,
  },
  about:{
    fontsize:20,
    fontWeight:'bold', 
  },
  description:{
    color:'grey',
    fontSize:16,
    lineHeight:22,
    marginTop:10,
  },
  buyContainer:{
    marginTop:20,
    flexDirection:'row',
    justifyContent:'space-between',
  },
  btnContainer:{
    flexDirection:'row',
    alignItems:'center',
  },
  borderBtn:{
    borderColor:'grey',
    borderWidth:1,
    borderRadius:5,
    height:40,
    width:60,
    justifyContent:'center',
    alignItems:'center',
  },
  borderBtnText:{
    fontWeight:'bold',
    fontSize:28,
  },
  quantity:{
    fontSize:20,
    marginHorizontal:10,
    fontWeight:'bold',
  },
  buyBtn:{
    width:150,
    height:50,
    backgroundColor:COLORS.green,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:30,
  },
  buyBtnText:{
    color:COLORS.white,
    fontSize:18,
    fontWeight:'bold',
  },
});
export default NewSelectedGift;