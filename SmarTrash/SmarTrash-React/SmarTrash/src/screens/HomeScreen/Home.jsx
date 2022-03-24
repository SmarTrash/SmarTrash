import React from 'react';
import {StyleSheet, Text, View, SafeArea, Image, ScrollView } from 'react-native';
import COLORS from '../../consts/colors';
//import {Ionicons, SimpleLineIcons, Entypo, MaterialCommunityIcons, MaterialIcons} from '@expo/vector-Icons';

export default function Home() {
    return(
        <SafeArea style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.titleBar}>
                    <SimpleLineIcons name='options' size={24} color='#52575D' />
                    <Entypo name='notification' size={24} color='#52575D' />
                </View>
                
                <View style={{alignSelf:'center'}}>
                    <View style={styles.profileImage}>
                        <Image
                        source={{
                            uri:
                              'https://m.media-amazon.com/images/M/MV5BMGViMTE0MmMtNzA2OC00ZjA4LTg5M2ItY2JiYTg5NDNkY2VhXkEyXkFqcGdeQXVyMjMyMzI4MzY@._V1_.jpg',
                          }}
                          style={styles.image}
                          resizeMode='center' />
                    </View>
                    <View style={styles.add}>
                        <MaterialIcons name='mode-edit' size={16} color='#DFD8C8' style={{marginTop:6, marginLeft:2}}/>
                    </View>
                </View>

                <View style={styles.infoContainer}>
                    <Text style={[styles.text, {fontWeight:'200', fontSize:36,}]}>מאיה ורטיימר
                    <MaterialCommunityIcons name='account-edit' size={24} color='#52575D' />
                    </Text>
                </View>

                <View style={styles.statusContainer}>
                    <View style={styles.statusBox}>
                          <Text style={[styles.text, {fontSize:24, }]}>60</Text>
                          <Text style={[styles.text, styles.subText]}>צבירה אחרונה</Text>
                    </View>
                    <View style={[styles.statusBox, {borderColor:'#DFD8C8', borderLeftWidth:1, borderRightWidth:1}]}>
                          <Text style={[styles.text, {fontSize:24, }]}>5000</Text>
                          <Text style={[styles.text, styles.subText]}>סה"כ נקודות</Text>
                    </View>
                    <View style={styles.statusBox}>
                          <Text style={[styles.text, {fontSize:24, }]}>3</Text>
                          <Text style={[styles.text, styles.subText]}>מקומך בתחרות</Text>
                    </View>
                </View>
            </ScrollView>
        </SafeArea>

    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:COLORS.white,
      alignItems:'center',
      justifyContent:'center',
    },
    text: {
      fontFamily:'HelveticaNeue',
      color:'#52575D',
    },
    subText:{
        fontSize:12,
        color:'#AEB5BC',
        fontWeight:500,
    },
    image:{
        flex:1,
        width:undefined,
        height: undefined,
    },

    profileImage:{
        width:200,
        height:200,
        borderRadius:100,
        overflow:'hidden',
    },
    infoContainer:{
        alignSelf:'center',
        alignItems:'center',
        marginTop:16,    
    },
    add:{
        backgroundColor:'#41444B',
        position:'absolute',
        bottom:0,
        right:0,
        width:60,
        height:60,
        borderRadius:30,
        alignItems:'center',
        justifyContent:'center',

    },
    statusContainer:{
        flexDirection:'row',
        alignSelf:'center',
        marginTop:32,
    },
    statusBox:{
        alignItems:'center',
        flex:1,
    },
});