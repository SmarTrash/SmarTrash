import { View, Text, Animated, Dimensions, StyleSheet, TouchableOpacity, BottomSheetModal } from 'react-native'
import React, { useState, useEffect, useRef,useContext } from 'react'
import { Colors, Portal } from 'react-native-paper';
import COLORS from '../../Consts/colors';
import { AntDesign, MaterialIcons, Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { GlobalContext } from '../../../GlobalContext/GlobalContext';

const { width } = Dimensions.get('screen');
const { height } = Dimensions.get('screen');
const cardWidth = width / 1;
const cardHeight = height / 1;

const BottomSheet = ({ show, onDismiss, children }) => {
    const bottomSheetHeight = Dimensions.get('window').height * 0.25;
    const deviceWidth = Dimensions.get('window').width;
    const { open, setOpen } = useContext(GlobalContext);
    const bottom = useRef(new Animated.Value(-bottomSheetHeight)).current;
    const navigation = useNavigation();

    useEffect(() => {
        if (show) {
            setOpen(show);
            Animated.timing(bottom, {
                toValue: -bottomSheetHeight,
                duration: 500,
                useNativeDriver: false,
            }).start();

        } else {
            Animated.timing(bottom, {
                toValue: -bottomSheetHeight,
                duration: 500,
                useNativeDriver: false,
            }).start(() => {
                setOpen(false);
            });
        }


    }, [show])
    if (!open) {
        return null;
    }
    return (
        <Portal>
            <Animated.View
                style={[styles.root, { height: bottomSheetHeight, bottom: 0, shadowOffset: { height: -3 } }, styles.common]} >
                <View style={[
                    styles.header,
                    styles.common,
                    { shadowOffset: { height: 3 }, },]}>
                    <View style={{
                        width: 40,
                        height: 3,
                        borderRadius: 1.5,
                        position: 'absolute',
                        top: 8,
                        left: (deviceWidth - 230),
                        zIndex: 10,
                        backgroundColor: "#ccc",

                    }} />
                    <AntDesign name="closecircleo" size={24} color={COLORS.green}
                        style={styles.closeIcon}
                        onPress={onDismiss}
                    />
                    <Text style={{ top: 15, left: 150, fontWeight: "bold", color: '#818181' }}>החלפת תמונה באמצעות</Text>
                </View>
                {children}

                <TouchableOpacity onPress={() => {
                    navigation.navigate("CameraScreen")
                    console.log("pressedCamera")
                    setOpen(false);
                    
                }}>
                    <Entypo name="camera" size={100} color={COLORS.primary} style={styles.camera} />
                    <Text style={styles.textC}>מצלמה</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {
                    //    navigation.navigate("CameraScreen") 
                    console.log("pressedGallery")
                    setOpen(false);
                   
                }}>
                    <MaterialIcons name="photo-library" size={99} color={COLORS.primary} style={styles.library} />
                    <Text style={styles.textG}>גלריה</Text>
                </TouchableOpacity>
            
            </Animated.View>
        </Portal>
    );
};
const styles = StyleSheet.create({
    root: {
        position: "absolute",
        left: 0,
        right: 0,
        zIndex: 100,
        // backgroundColor: "#F7F7F7",
        backgroundColor: "white",
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        overflow: "hidden",

    },
    header: {
        height: 50,
        backgroundColor: "white",
    },
    common: {
        shadowColor: "black",
        shadowOffset: {

            width: 0,
        },
        shadowOpacity: 0.24,
        shadowRadius: 4,
        elevation: 3,
    },
    closeIcon: {
        position: "absolute",
        right: 10,
        top: 15,
        zIndex: 10,
    },
    library: {
        bottom: 82,
        left: 270
    },
    camera: {
        top: 30,
        left: 80,
        borderRadius: 5,
    },
    textG: {
        bottom: 82,
        left: 300,
        fontWeight: "bold",
        color: '#818181',
    },
    textC: {
        top: 30,
        left: 110,
        fontWeight: "bold",
        color: '#818181',

    }
})
export default BottomSheet