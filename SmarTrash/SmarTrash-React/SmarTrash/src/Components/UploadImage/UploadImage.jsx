import { View, Text, StyleSheet} from 'react-native'
import React,{useContext} from 'react'
import { GlobalContext } from '../../../GlobalContext/GlobalContext';



const UploadImage = () => {

const { userImg } = useContext(GlobalContext);

    console.log("upload image page = ", userImg);

    const imageUpload = (imgUri, picName) => {

        let urlAPI = "http://.../site01/uploadpicture";
        let dataI = new FormData();

        dataI.append('picture', {
            uri: imgUri,
            name: picName,
            type: 'image/jpg'
        });
        const config = {
            method: 'POST',
            body: dataI,
        }
        fetch(urlAPI, config)
            .then((res) => {
                if (res.status == 201) { return res.json(); }
                else { return "err"; }
            })
            .then((responseData) => {
                if (responseData != "err") {
                    let picNameWOExt = picName.substring(0, picName.indexOf("."));
                    let imageNameWithGUID = responseData.substring(responseData.indexOf(picNameWOExt),
                        responseData.indexOf(".jpg") + 4);
                    this.setState({
                        uplodedPicUri: { uri: this.uplodedPicPath + imageNameWithGUID },
                    });
                    console.log("img uploaded successfully!");
                }
                else { alert('error uploding ...'); }
            })
            .catch(err => { alert('err upload= ' + err); });
    }

    return (
        <View>
            <Text>UploadImage</Text>
        </View>
    )
}

export default UploadImage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#fff",

    },
});