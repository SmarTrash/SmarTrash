import React from 'react';
import {
  useWindowDimensions,
  View,Dimensions,
  Text,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import COLORS from '../../Consts/colors'
 const { width } = Dimensions.get('screen');
const { height } = Dimensions.get('screen');
const cardWidth = width;
const cardHeight = height; 
const Loader = ({visible = false}) => {
 
  return (
    visible && (
      <View style={[style.container]}>
        <View style={style.loader}>
          <ActivityIndicator size="large" color={COLORS.green} />
          <Text style={{marginLeft: 10, fontSize: 16}}>Loading...</Text>
        </View>
      </View>
    )
  );
};

const style = StyleSheet.create({
  container: {
    height:cardHeight,
    width:cardWidth,
    flex:1,
    position: 'absolute',
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
  },
  loader: {
    height: 70,
    backgroundColor: COLORS.white,
    marginHorizontal: 50,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

});

export default Loader;