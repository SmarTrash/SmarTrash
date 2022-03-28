import React from 'react';
import { ImageBackground, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import COLORS from '../../Consts/colors'
import NumericInput from 'react-native-numeric-input'
import { useState } from 'react';
import { AntDesign,FontAwesome5 } from '@expo/vector-icons'; 


const SelectedGift = ({ navigation, route }) => {

  const item = route.params;
  const [amount, setAmount] = useState(0);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        backgroundColor: COLORS.white,
        paddingBottom: 20,
      }}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="rgba(0,0,0,0)"
      />
      <ImageBackground style={style.headerImage} source={item.img}>
        <View style={style.header}>

        <AntDesign
            name="left"
            size={28}
            color={COLORS.white}
            onPress={navigation.goBack}
          />
        </View>
      </ImageBackground>
      <View>
        <View style={style.iconContainer}>
        <AntDesign name="hearto" size={24} color={COLORS.white} />
        </View>
        <View style={{ marginTop: 20, paddingHorizontal: 20 }}>
          <Text style={{ fontSize: 30, fontWeight: 'bold', alignSelf: 'flex-end' }}>{item.GiftName}</Text>
          <Text
            style={{
              fontSize: 20,
              fontWeight: '400',
              color: COLORS.grey,
              marginTop: 10,
              alignSelf: 'flex-end',
              color: COLORS.primary,
            }}>
            {item.Brand}
          </Text>
          <View
            style={{
              marginTop: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
          </View>
          <View style={{ marginTop: 20, fontSize: 30 }}>
            <Text style={{ lineHeight: 20, color: COLORS.grey, alignSelf: 'flex-end' }}>
              {item.GiftDescription}
            </Text>
          </View>
        </View>
        <View style={style.amount}>
        <NumericInput type='up-down' onChange={value => (setAmount)} />
        </View>
        <View style={style.priceTag}>
        <FontAwesome5 style={{left:20}} name="coins" size={15} color="gold" />
            <Text
              style={{fontSize: 16,fontWeight: 'bold',color: COLORS.grey,marginLeft: 5,left:20 , color:'white'}}>
              {1800}

            </Text>
            </View>
        <View style={style.btn}>
          <Text style={{ color: COLORS.white, fontSize: 18, fontWeight: 'bold' }}>
            רכישה
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  btn: {
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    backgroundColor: COLORS.primary,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  amount: {
    left:250,
    top:30,
   
  },
  priceTag: {
    height: 40,
    bottom:15,
    width:150,
    alignItems: 'center',
    marginLeft: 50,
    paddingLeft: 20,
    flex: 1,
    bottom:15,
    width:150,
    backgroundColor: '#76bfa3',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius:20,
    borderTopRightRadius:20,
    flexDirection: 'row',
  },
  iconContainer: {
    position: 'absolute',
    height: 60,
    width: 60,
    backgroundColor: COLORS.primary,
    top: -30,
    left: 20,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerImage: {
    height: 500,
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
    overflow: 'hidden',
  },
  header: {
    marginTop: 60,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    justifyContent: 'space-between',
  },

});

export default SelectedGift