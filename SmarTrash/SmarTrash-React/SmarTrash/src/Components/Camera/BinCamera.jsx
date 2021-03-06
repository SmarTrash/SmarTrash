import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Camera } from 'expo-camera';
import { GlobalContext } from '../../../GlobalContext/GlobalContext';
import Loader from '../../Components/Loader/Loader';
import { sendToAzure } from '../../Utils/CameraUtils';
import COLORS from '../../Consts/colors';
import { useNavigation } from '@react-navigation/native';
import { Entypo, Ionicons } from '@expo/vector-icons';


let urlAPI = "http://proj.ruppin.ac.il/bgroup91/prod/api/HomePage/ImageFindBin";

const BinCamera = () => {

    const { setImageBin, imageBin } = useContext(GlobalContext);
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [camera, setCamera] = useState(null);
    const [picUri, setPicUri] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();


    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    const uploadImage = (productImage) => {
        imageUpload(productImage, 'productPicture.jpg')
    }

    const imageUpload = (productImage, picName) => {
        let dataI = new FormData();
        console.log('config', config);
        dataI.append('product', {
            uri: productImage,
            name: picName,
            type: 'image/jpg'
        });

        const config = {
            method: 'POST',
            body: dataI,
        }
        setLoading(true);

        console.log('imageBin', imageBin);

        try {
            fetch(urlAPI, config)
                .then((res) => {
                    return res.json()
                })
                .then((responseData) => {
                    console.log("responseData=", responseData)
                    if (responseData != "err" || responseData != null || !responseData) {
                        console.log("img uploaded successfully!");
                        sendToAzure(responseData)
                            .then(type => {
                                console.log(type)
                                setLoading(false);
                                navigation.navigate("BinPicture", { binName: type })
                            })
                            .catch(err => {
                                console.log("err in responseData-sendToAzure")
                                console.log(err)
                            })
                    }
                    else { alert('error uploding ...'); }
                })
                .catch(err => { alert('err upload= ' + err); });

        } catch (error) {
            Alert.alert('Error', 'Something went wrong');
        }
    }
    return (

        <View style={{width:'100%',height:'100%'}} >
                <Loader visible={loading} />
            <View style={styles.container}>
                <Camera style={styles.camera} type={type} ref={ref => setCamera(ref)}>
                    <View style={styles.buttonContainer}>


                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                setType(
                                    type === Camera.Constants.Type.back
                                        ? Camera.Constants.Type.front
                                        : Camera.Constants.Type.back
                                );
                            }}>
                            {/* ???????? ???? */}
                            <View style={{ marginRight: 50, bottom: 40 }} >
                                <Ionicons style={styles.text} name="ios-camera-reverse-outline" size={35} color="black" />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.buttonCamera}
                            onPress={async () => {
                                if (camera) {
                                    const data = await camera.takePictureAsync(null);
                                    setPicUri(data.uri);
                                    console.log('change', picUri);
                                    uploadImage(data.uri);
                                    setImageBin(data.uri);
                                }
                            }}>
                            <View >
                                {/* ?????? */}
                                <Entypo style={styles.text} name="circle" size={70} />
                            </View>
                        </TouchableOpacity>
                    </View>
                </Camera>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        //?????????? ???????? ???? ?????????? ???? ????????????
        flex: 0.95,
        width: 550,
    },
    buttonContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        margin: 20,

    },
    button: {
        flex: 0.2,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    buttonCamera: {
        flex: 0.2,
        alignSelf: 'flex-end',
        alignItems: 'center',
       marginLeft:13,
        bottom: 30
    },
    text: {
        color: 'white',
    },
    picture: {
        width: 200,

        height: 200,
        borderWidth: 1,
        borderColor: COLORS.primary,
        margin: 10,
        alignSelf: 'center',
        borderRadius: 150,

    },
    loader: {
        width: 50,
        height: 60
    }
});

export default BinCamera