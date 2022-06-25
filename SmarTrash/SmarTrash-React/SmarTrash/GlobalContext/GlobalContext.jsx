
import React,{ createContext,useState } from "react"

const GlobalContext = createContext({});

const Provider = ({ children }) => {
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState(0);

    const [userEmail, setUserEmail] = useState('');
    const [userImg, setUserImg] = useState('https://cdn-icons-png.flaticon.com/512/149/149071.png');
    const [ userFirstName, setUserFirstName] = useState('');
    const [userLastName, setUserLastName] = useState('');
    const [userCompetitionPlace, setUserCompetitionPlace] = useState('');
    const [userLastThrow, setUserLastThrow] = useState('');
    const [userPoints, setUserPoints] = useState('');
    const [password, setPassword] = useState('');
    const [userGender, setUserGender] = useState('');
    const [userPhone, setUserPhone] = useState('');
    const [userBirthDate, setUserBirthDate] = useState('');
    const [userCityId, setUserCityId] = useState('');
    const [userStreetNameAndNumber, setUserStreetNameAndNumber] = useState('');
    const [checked, setChecked] = useState(false);
    const [userToken, setUserToken] = useState('');
    const [userCityName, setUserCityName] = useState('');
    const [userDetails, setUserDetails] = useState(''); 
    const [userOrderPhone, setuserOrderPhone] = useState();
    const [userOrderStreetNameAndNumber, setuserOrderStreetNameAndNumber] = useState();
    const [binQRId, setBinQRId] = useState('Not yet scanned')
    const [userState, setUserState] = useState({
        running: true,
        points: 0,
        updateTimer: 0,
        username: '',
        visibleModal: true,
        item: "can" //random
      });
    const GlobalContextOrginal = {
        cities, setCities,userCityName, setUserCityName,userState, setUserState,
        selectedCity, setSelectedCity,userDetails, setUserDetails,
        userImg, setUserImg,
        password, setPassword,
        userFirstName, setUserFirstName,
        userLastName, setUserLastName,
        userCompetitionPlace, setUserCompetitionPlace,
        userLastThrow, setUserLastThrow,
        userPoints, setUserPoints,
        userGender, setUserGender,
        userPhone, setUserPhone,
        userBirthDate, setUserBirthDate,
        userCityId, setUserCityId,
        userStreetNameAndNumber, setUserStreetNameAndNumber,
        userEmail, setUserEmail,checked, setChecked,
        userToken, setUserToken,userOrderPhone, setuserOrderPhone,userOrderStreetNameAndNumber, setuserOrderStreetNameAndNumber,
        binQRId, setBinQRId}
        
    return (
        <GlobalContext.Provider value={GlobalContextOrginal}>
            {children}
        </GlobalContext.Provider>
    )
}
export {GlobalContext,Provider};