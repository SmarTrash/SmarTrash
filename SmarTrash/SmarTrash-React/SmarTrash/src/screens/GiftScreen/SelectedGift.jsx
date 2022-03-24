import React from 'react';
import { ImageBackground, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import COLORS from '../../consts/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import NumericInput from 'react-native-numeric-input'
import { useState } from 'react';
import { sizeWidth } from '@mui/material/node_modules/@mui/system';

const SelectedGift = ({ navigation, route }) => {

  // const item = route.params;
  const [amount, setAmount] = React.useState(0);

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
      <ImageBackground style={style.headerImage} source={{ uri: 'https://www.cristalica.de/media/image/product/89332/md/glass-straws-10-pack-with-cleaning-brush-21cmx8mm.jpg' }}>
        <View style={style.header}>
          <Icon
            name="arrow-back-ios"
            size={28}
            color={COLORS.white}
          //   onPress={navigation.goBack}
          />
          <Icon name="bookmark-border" size={38} color={COLORS.white} />
        </View>
      </ImageBackground>
      <View>
        <View style={style.iconContainer}>
          <Icon name="place" color={COLORS.white} size={28} />
        </View>
        <View style={{ marginTop: 20, paddingHorizontal: 20 }}>
          <Text style={{ fontSize: 30, fontWeight: 'bold', alignSelf: 'flex-end' }}>{'קשים ממתכת'}</Text>
          <Text
            style={{
              fontSize: 20,
              fontWeight: '400',
              color: COLORS.grey,
              marginTop: 10,
              alignSelf: 'flex-end',
              color: COLORS.primary,
            }}>
            {'Majestic Straw'}
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
              {'קשים רב פעמיים ממתכת איכותית ניתנים לשטיפה במדיח'}
            </Text>
          </View>
        </View>
        <View style={style.btn}>
          <Text style={{ color: COLORS.white, fontSize: 18, fontWeight: 'bold' }}>
            Book Now
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
    left:220,
  },
  priceTag: {
    height: 40,
    alignItems: 'center',
    marginLeft: 40,
    paddingLeft: 20,
    flex: 1,
    backgroundColor: COLORS.secondary,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    flexDirection: 'row',
  },
  num: {
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