import {Dimensions, FlatList, SafeAreaView, ScrollView, StyleSheet ,Text ,TextInput, TouchableOpacity, View,Image, Animated,} from 'react-native';
import React from 'react'
import CategoryList from '../../screens/CategoryList/CategoryList';
import COLORS from '../../Consts/colors';
import Card from '../../Components/Card/Card';
import gifts from '../../Consts/gifts';
import CardMonthGift from '../../Components/Card/CardMonthGift';


const { width } = Dimensions.get('screen');
const cardWidth = width / 1.8;

const GiftsPage = () => {


const [activeCardIndex, setActiveCardIndex] = React.useState(0);
const scrollX = React.useRef(new Animated.Value(0)).current;

   
    return (
       <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
       <View style={style.header}>
         <View style={{paddingBottom: 15}}>
           <Text style={{fontSize: 30, fontWeight: 'bold', alignSelf: 'flex-end', left:150}}>
             הטבות
           </Text>
         </View>

       </View>
       <ScrollView showsVerticalScrollIndicator={false}>
    
       <CardMonthGift/>

         <View style={style.categoryListContainer}> 
         <CategoryList />
         </View>
       
         
          <Animated.FlatList
            onMomentumScrollEnd={(e) => {
              setActiveCardIndex(
                Math.round(e.nativeEvent.contentOffset.x / cardWidth),
              );
            }}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {x: scrollX}}}],
              {useNativeDriver: true},
            )}
            horizontal
            data={gifts}
            contentContainerStyle={{
              paddingVertical: 30,
              paddingLeft: 20,
              paddingRight: cardWidth / 2 - 40,
            }}
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => <Card gifts={item} index={index} />}
            snapToInterval={cardWidth}
          />
      </ScrollView>
    </SafeAreaView>
  );
};
        
      
const style = StyleSheet.create({
    header: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    categoryListContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginTop: 30,
    },
    categoryListText: {
        fontSize: 17,
        fontWeight: 'bold',
    },
    card: {
        height: 280,
        width: cardWidth,
        elevation: 15,
        marginRight: 20,
        borderRadius: 15,
        backgroundColor: COLORS.white,
    },
    cardImage: {
        height: 200,
        width: '100%',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    priceTag: {
        height: 60,
        width: 80,
        backgroundColor: COLORS.primary,
        position: 'absolute',
        zIndex: 1,
        right: 0,
        borderTopRightRadius: 15,
        borderBottomLeftRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardDetails: {
        height: 100,
        borderRadius: 50,
        backgroundColor: COLORS.white,
        position: 'absolute',
        bottom: 0,
        padding: 20,
        width: '100%',
    },
    cardOverLay: {
        height: 280,
        backgroundColor: COLORS.white,
        position: 'absolute',
        zIndex: 100,
        width: cardWidth,
        borderRadius: 15,
    },
    topHotelCard: {
        height: 120,
        width: 120,
        backgroundColor: COLORS.white,
        elevation: 15,
        marginHorizontal: 10,
        borderRadius: 10,
        
    },
    topHotelCardImage: {
        height: 80,
        width: '100%',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
    },
  
});
export default GiftsPage