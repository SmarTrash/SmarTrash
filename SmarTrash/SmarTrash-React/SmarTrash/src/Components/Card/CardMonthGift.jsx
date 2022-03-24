import {Dimensions, FlatList, SafeAreaView, ScrollView, StyleSheet ,Text ,TextInput, TouchableOpacity, View,Image, Animated,} from 'react-native';
import React from 'react'
import COLORS from '../../consts/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';


const CardMonthGift = () => {
    return (
      <View style={style.topHotelCard}>
        <View
          style={{
            position: 'absolute',
            top: 5,
            right: 5,
            zIndex: 1,
            flexDirection: 'row',
          }}>
          <Icon name="star" size={15} color={COLORS.orange} />
          <Text style={{color: COLORS.white, fontWeight: 'bold', fontSize: 15}}>
            5.0
          </Text>
        </View>
        <Image style={style.topHotelCardImage} source={{uri:'https://www.ikea.com/global/assets/navigation/images/decorative-accessories-24924.jpeg?imwidth=300'}} />
        <View style={{paddingVertical: 5, paddingHorizontal: 10}}>
        <Text style={{fontSize: 20, fontWeight: 'bold', color: COLORS.primary, alignSelf: 'flex-end'}}>
            {'הטבה חודשית'}
          </Text>
          <Text style={{fontSize: 10, fontWeight: 'bold', alignSelf: 'flex-end'}}>{'1+1 במחלקת הנוי של IKEA הקופון תקף בכל סניפי הרשת'}</Text>
          <Text style={{fontSize: 7, fontWeight: 'bold', color: COLORS.grey, alignSelf: 'flex-end'}}>
            {'IKEA'}
          </Text>
        </View>
      </View>
    );
  };

  const style = StyleSheet.create({
   
    topHotelCard: {
        height: 300,
        width: 400,
        backgroundColor: COLORS.white,
        elevation: 15,
        marginHorizontal: 10,
        borderRadius: 10,
    },
    topHotelCardImage: {
        height: 250,
        width: '100%',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
    }
});
export default CardMonthGift