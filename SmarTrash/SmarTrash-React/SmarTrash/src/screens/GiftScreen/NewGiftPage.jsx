import React from 'react';
import {View, Text,TextInput, SafeAreaView, StyleSheet, Dimensions, Image } from 'react-native';
import COLORS from '../../consts/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import gifts from '../../consts/gifts';

const width = Dimensions.get('screen').width/2-30;
const NewGiftPage = ({navigation}) => {
  const categories =[ 'הכל', 'נוי','בית','פנאי','ביגוד'];
  const [categoryIndex, setCategoryIndex] = React.useState(0);

  const CategoryList =() => {
    return (
    <View style={style.categoryContainer}>
      {categories.map((item,index)=> (
        <TouchableOpacity key={index}
        activeOpacity ={0.8}
        onPress={() =>setCategoryIndex(index) }>
        <Text  
          style={[
          style.categoryText,
          categoryIndex == index && style.categoryTextSelected
          ]}>
          {item}
        </Text>
        </TouchableOpacity>
      ))}
    </View>
    );
  };
const Card = ({gifts}) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate('NewSelectedGift',gifts)}>
    <View style={style.card}>
     <View style={{height:100, alignItems:'center'}}>
        <Image  
          style={{flex:1, resizeMode:'contain'}}
          source={{
          uri: 'https://reactnative.dev/img/tiny_logo.png',
                }} >
        </Image>
      </View>
      <Text style={style.giftName}>
          {gifts.GiftName}
      </Text>
      <View style={{justifyContent:'space-between', marginTop:5}}>
        <Text style={style.giftPrice}>  
          <Icon name='star-circle'npm size={30} color='#FFD700' />
              {gifts.Price}
        </Text>
      </View>
  </View>
</TouchableOpacity>
  
  );
};
   return (
    <SafeAreaView 
      style={style.safeArea}>
      <View style={style.header}>
        <View>
          <Text style={style.text}> הטבות </Text>
        </View> 
      </View>
      
      <View style={style.search}>
        <View style={style.searchContainer}>
          <Icon name="search" size={25} style={{marginRight:10}}/>
          <TextInput placeholder=' חיפוש ' style={style.input}/>
        </View>
        <View style={style.sortBtn}>
          <Icon name="sort" size={30} color={COLORS.white} />
        </View>
      </View>
      <CategoryList />
      <FlatList 
      columnWrapperStyle={{justifyContent:'space-around'}}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle ={{
      marginTop:10,
      paddingBottom:50,
      }}
      numColumns={2} 
      data={gifts} 
      renderItem={({item}) => <Card gifts={item} />} />
    </SafeAreaView>
    );
};

const style = StyleSheet.create({
  safeArea: {
    flex:1,
    paddingHorizontal:20, 
    backgroundColor:COLORS.white,
  },
  header:{
    marginTop:30,
    justifyContent: 'space-between',
  },
  text:{
    fontSize:38,
    fontWeight:'bold',
    color:COLORS.green,
    textAlign:'right',
  },
  search:{
    marginTop:30,
    flexDirection:'row-reverse',
  },

  searchContainer:{
    height:50,
    backgroundColor:COLORS.light,
    borderRadius:10,
    flex: 1, 
    flexDirection:'row-reverse',
    alignItems:'center',
  },
  input:{
    textAlign:'right',
    fontSize:18,
    fontWeight:'bold',
    color: COLORS.dark,
    flex:1,
    
  },
  sortBtn:{
    marginRight:5,
    marginLeft:10,
    height:50,
    width:50,
    backgroundColor:COLORS.green,
    justifyContent:'center',
    alignItems:'center',
    borderRadius: 10,
  },
  categoryContainer:{
    flexDirection:'row-reverse',
    marginTop:20,
    marginRight:20,
    marginLeft:20,
    marginBottom:20,
    justifyContent: 'space-between',
    textAlign:'right',
  },
  categoryText:{
    fontSize:16,
    color:'grey',
    fontWeight:'bold',
  },
  categoryTextSelected:{
    color:COLORS.green,
    paddingBottom:5,
    borderBottomWidth:5,
    borderColor: COLORS.green,

  },
  card: {
    height:225,
    backgroundColor:COLORS.light,
    width,
    marginHorizontal:2,
    borderRadius:10,
    marginBottom:20,
    padding:15,
  },
  giftName:{
      fontWeight:'bold', 
      fontSize:17, 
      marginTop:10,
      textAlign:'center'
  },
  giftPrice:{
      fontWeight:'bold', 
      fontSize:15, 
      marginTop:10,
      textAlign:'center',
  },
});
export default  NewGiftPage