import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Card, SearchBar } from 'react-native-elements';
import Icon  from 'react-native-vector-icons/MaterialCommunityIcons';

export default function GiftPage({navigation}) {
  const [search, setSearch] = useState("");

  const updateSearch = (search) => {
    setSearch(search);
  };
  return (
    <>
    <ScrollView>

    <View style={styles.container}>
    <SearchBar

        backgroundColor="#FFFFFF"
        placeholder="Type Here..."
        onChangeText={updateSearch}
        value={search}
      />
      <TouchableOpacity onPress={() => {navigation.navigate('SelectedGift');}}>
      <Card style={styles.card}>
          <Card.Image
            style={{ padding: 0 }}
            source={{
              uri:
                'https://www.cristalica.de/media/image/product/89332/md/glass-straws-10-pack-with-cleaning-brush-21cmx8mm.jpg',
            }}
          />
          <Card.Title style={styles.title} > {"\n"} Majestic Straw</Card.Title>
          <Card.Divider />
          <Text style={styles.text}>
            סט קשים רב פעמי
            {"\n"}
            <Icon style={styles.icon} name="star-circle" size={30} color='#FFD700'/> 1800
          </Text>
        </Card>
   </TouchableOpacity>
   <TouchableOpacity onPress={() => {navigation.navigate('SelectedGift');}}>
      <Card style={styles.card}>
          <Card.Image
            style={{ padding: 0 }}
            source={{
              uri:
                'https://www.ikea.com/global/assets/navigation/images/decorative-accessories-24924.jpeg?imwidth=300',
            }}
          />
          <Card.Title style={styles.title} > {"\n"} IKEA</Card.Title>
          <Card.Divider />
          <Text style={styles.text}>
            1+1 בכל מחלקת הנוי
            {"\n"}
            <Icon style={styles.icon} name="star-circle" size={30} color='#FFD700'/> 1800
          </Text>
        </Card>
   </TouchableOpacity>
   </View>
   </ScrollView>
    </>
  
)

}
const styles = StyleSheet.create({
container: {
  flex: 1,
},
card: {
  backgroundColor : 'black'
},
text:{
  
  fontSize: 20, 
  textAlign:'center',
},
title: {
  fontSize: 20,
},
icon:{
paddingTop:2500,
},

});
