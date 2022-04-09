
import React,{ createContext,useState } from "react"

const GlobalContext = createContext({});

const Provider = ({ children }) => {
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState(0);
    console.log("Citycontext=" , cities)
    const GlobalContextOrginal = {cities,setCities,selectedCity, setSelectedCity}
    return (
        <GlobalContext.Provider value={GlobalContextOrginal}>
            {children}
        </GlobalContext.Provider>
    )
}
export {GlobalContext,Provider};