import { View, Text } from 'react-native'
import React from 'react'

export default function GiftCardMonth() {
  return (
<View style={styles.container}>
      <Card style={styles.cardGift}>
            <Card.Image
              style={styles.image}
              source={{
                uri:
                  'https://freepngdesign.com/content/uploads/images/hm-black-logo-4543.png',
              }}
            />
            
            <Text style={styles.text}>
            הטבה חודשית
            {"\n"}
            100 ש"ח מתנה 
            {"\n"}
            בכל חנויות H&M
            </Text>
          </Card>
    </View>
    
  )
  
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 10
  },
  cardGift:{
   borderRadius:20,
   backgroundColor: "blue",
  },
  image: {
    width: 200,
    height: 200,
    marginRight: 0, 
  },
  title: {
    fontSize: 20, 
  },
  text: {
    
    bottom:150,
    fontSize: 20, 
    textAlign:'right',
  },
});