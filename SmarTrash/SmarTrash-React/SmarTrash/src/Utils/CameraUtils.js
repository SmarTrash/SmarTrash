let urlUpdateImage = "http://proj.ruppin.ac.il/bgroup91/prod/api/HomePage/uploadpicture/";
export const ChangeImage = (newUserImage, userEmail) => {
    
    fetch(urlUpdateImage, {
      method: 'POST',
       body: JSON.stringify({ UserEmail: userEmail,
                              UserImg: newUserImage}),
      headers: new Headers({
        'Content-type': 'application/json; charset=UTF-8',
        'Accept': 'application/json; charset-UTF-8'
      })
    }).then((res) => {
      if (res.status == 201) {
        Alert.alert(
          userFirstName + " " + userLastName,
          "התמונה שונתה בהצלחה",
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
            },
            { text: "OK", onPress: () => ifPressOK() }
          ]
        );
      }
      else { return "err"; }
    })

}

    // const uploadImage = () => {
    //     fetch(urlAPI, config)
    //     .then((res) => {
    //       console.log({res});
    //      return res.json() 
    //       // else { return "err"; }
    //     })
    //     .then((responseData) => {
    //       console.log("responseData=", responseData)
    //       if (responseData != "err") {
    //         console.log("img uploaded successfully!");
    //         console.log("responseData")
    //         console.log(responseData)
    //         setNewUserImage(responseData);
    //         ChangeImage(responseData, userEmail);
  
    //       }
    //       else { alert('error uploding ...'); }
    //     })
    //     .catch(err => { alert('err upload= ' + err); });
    // }

    export const sendToAzure = async imageURL => {
        console.log("in func")
        console.log("image in sendToAzure")
        console.log(imageURL)

        if (imageURL.indexOf("http") != 0)
        {
            console.log("bad url")
            return "err";
        }
        const body = { "Url": imageURL }
        return fetch('https://smartrash-prediction.cognitiveservices.azure.com/customvision/v3.0/Prediction/50cdf13e-2009-402f-93a9-7b0e07882847/detect/iterations/%D7%A4%D7%97%20%D7%A1%D7%92%D7%95%D7%9C/url', {
            method: 'POST',
            headers: {
            Accept: 'application/json',
            'Prediction-Key': 'd1b1947d7c0f43b0b084ad23bd7d3a04',
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
            })
            .then(response => { return response.json() })
            .then(res => {
                console.log("res iin func")
                console.log(res)
                const type = res?.predictions[0]?.tagName;
                console.log("type")
                console.log(type)
                return type;
            }).catch(err => {
                console.log("err in func")
                console.log(err)
            })

       

    }
  