
import React,{ createContext,useState } from "react"

const GlobalContext = createContext({});

const Provider = ({ children }) => {
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState(0);

    const [userEmail, setUserEmail] = useState('');
    const [userImg, setUserImg] = useState('');

    const [checked, setChecked] = useState(false);

    const GlobalContextOrginal = {
        cities, setCities,selectedCity, setSelectedCity,setUserImg,userImg,
        userEmail, setUserEmail,checked, setChecked}
        
    return (
        <GlobalContext.Provider value={GlobalContextOrginal}>
            {children}
        </GlobalContext.Provider>
    )
}
export {GlobalContext,Provider};