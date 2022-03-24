import { View } from 'react-native'
import { GoogleLogout } from 'react-google-login';


const clientId = "821958134266-8knj70d0i6udqmnc9jcjr7goac7vv8qk.apps.googleusercontent.com";

const LogOut = () => {

    const onSuccess = () => {
        console.log("Log out seccessfull!")
    }
  
  return (
    <View>
    <GoogleLogout
    clientId={clientId}
    buttonText = 'Logout'
    onLogoutSuccess={onSuccess}
   
    
    />
  </View>
  )
}
export default LogOut;
