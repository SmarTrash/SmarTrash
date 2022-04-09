
import React,{ createContext,useState } from "react"

const GlobalContext = createContext({});

const Provider = ({ children }) => {
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState(0);

    const [userEmail, setUserEmail] = useState('');


    const GlobalContextOrginal = {
        cities, setCities,selectedCity, setSelectedCity,
        userEmail, setUserEmail}
        
    return (
        <GlobalContext.Provider value={GlobalContextOrginal}>
            {children}
        </GlobalContext.Provider>
    )
}
export {GlobalContext,Provider};