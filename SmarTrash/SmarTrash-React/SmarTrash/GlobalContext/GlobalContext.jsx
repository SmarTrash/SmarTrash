
import React,{ createContext,useState } from "react"

const GlobalContext = createContext({});

const Provider = ({ children }) => {
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState(0);

    const [userEmail, setUserEmail] = useState('');
    const [userImg, setUserImg] = useState('');
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
    const [show, setShow] = useState(false);
    const [open, setOpen] = useState(show)
    const [userCityName, setUserCityName] = useState('');
    const [userDetails, setUserDetails] = useState(''); 

    const GlobalContextOrginal = {
        cities, setCities,userCityName, setUserCityName,
        selectedCity, setSelectedCity,userDetails, setUserDetails,
        setUserImg,userImg,
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
        userToken, setUserToken,
        show, setShow,open, setOpen}
        
    return (
        <GlobalContext.Provider value={GlobalContextOrginal}>
            {children}
        </GlobalContext.Provider>
    )
}
export {GlobalContext,Provider};