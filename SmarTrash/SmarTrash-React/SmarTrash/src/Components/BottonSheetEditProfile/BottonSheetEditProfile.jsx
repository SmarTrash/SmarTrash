import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet } from 'react-native'
import React, { useRef } from 'react'
import ActionSheet from 'react-native-actionsheet';
import COLORS from '../../Consts/colors';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Gallery from '../../Components/Gallery/Gallery';


const BottonSheetEditProfile = () => {
    const navigation = useNavigation();
    let actionSheet = useRef();
    let optionArray = [
        'מצלמה', 'גלריה', 'יציאה'
    ];
    const showActionSheet = () => {
        console.log('lalal', actionSheet.current);
        actionSheet.current.show();

    }
    return (

        <SafeAreaView>
            <View>
                <TouchableOpacity
                    style={{ backgroundColor: 'green' }}
                    onPress={showActionSheet}>
                    {/* <Text>Open bottonSheet</Text> */}
                     <View style={styles.edit}>
                        <MaterialCommunityIcons name="circle-edit-outline" size={20} color='white' style={{ marginTop: 2, marginLeft: 2 }} />
                    </View> 
                </TouchableOpacity>

                 <ActionSheet
                    ref={actionSheet}
                    title={'תמונה באמצעות'}
                    options={optionArray}
                    cancelButtonIndex={2}
                    destructiveButtonIndex={1}
                    onPress={(index) => {

                        console.log('index',index);
                        if (optionArray[index] == 'מצלמה') {
                            navigation.navigate('CameraScreen')
                        }
                        else if (optionArray[index] == 'גלריה') {
                            console.log('lalalala=',optionArray[index] == 'גלריה');
                            <Gallery/>
                            // navigation.navigate('EditProfile')
                        }
                        else if (optionArray[index] == 'יציאה') {
                            navigation.navigate('EditProfile')
                        }
                    }}
                /> 
            </View>
        </SafeAreaView>

    )
}

export default BottonSheetEditProfile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        fontSize: 16,
        margin: 20,
        fontSize: 20,
        color: COLORS.green,
    },
    edit: {
        backgroundColor: COLORS.green,
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 35,
        height: 35,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        right: 14,
        bottom: 5
    },
});