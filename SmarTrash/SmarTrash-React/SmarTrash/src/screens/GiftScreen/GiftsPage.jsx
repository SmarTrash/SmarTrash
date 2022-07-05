import { Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, View, Animated, } from 'react-native';
import React, { useState, useEffect } from 'react'
import CategoryList from '../../screens/CategoryList/CategoryList';
import COLORS from '../../Consts/colors';
import Card from '../../Components/Card/Card';
import CardMonthGift from '../../Components/Card/CardMonthGift';

const { width } = Dimensions.get('screen');
const cardWidth = width / 1.8;
const apiUrl = 'http://proj.ruppin.ac.il/bgroup91/prod/api/Gift/GetAllGifts';

const GiftsPage = () => {
  const [giftData, setGiftData] = useState('');

  useEffect(() => {
    fetch(apiUrl, {
      method: 'GET',
      headers: new Headers({
        'Content-type': 'application/json; charset=UTF-8',
        'Accept': 'application/json; charset-UTF-8'
      })
    }).then(response => { return response.json() })
      .then(data => {
        setGiftData(data);
      });
  }, []);

  const [activeCardIndex, setActiveCardIndex] = React.useState(0);
  const scrollX = React.useRef(new Animated.Value(0)).current;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={style.header}>
        <View style={style.txtHeader}>
          <Text style={style.txt}>
            הטבות
          </Text>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <CardMonthGift />
        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
          <View style={style.categoryListContainer}>
            <CategoryList func={setGiftData} />
          </View>
        </ScrollView>
        <Animated.FlatList
          onMomentumScrollEnd={(e) => {
            setActiveCardIndex(
              Math.round(e.nativeEvent.contentOffset.x / cardWidth),
            );
          }}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: true },
          )}
          data={giftData}
          contentContainerStyle={{
            paddingVertical: 10,
            paddingLeft: 15,
            paddingRight: cardWidth / 2 - 40,
          }}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => <Card giftData={item} index={index} />}
          snapToInterval={cardWidth}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  header: {
    marginTop: 20,
    flexDirection: 'row-reverse',
    paddingHorizontal: 20,
    paddingBottom: 15,
    justifyContent: 'space-between'
  },
  txtHeader: {
    alignItems: 'center',
    alignSelf: 'center',
    alignContent: 'center',
  },
  txt: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: COLORS.primary,
    marginRight: 150,
  },
  categoryListContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 30,
  },
});
export default GiftsPage