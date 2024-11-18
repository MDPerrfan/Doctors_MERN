import { createContext } from "react";
import { useState } from "react";
export const DoctorContext=createContext()

const DoctorContextProvider =(props)=>{
const backendUrl = import.meta.env.VITE_BACKEND_URL
const [docToken, setDocToken] = useState(localStorage.getItem('docToken') ? localStorage.getItem('docToken') : '')

const value = {
backendUrl,
docToken
}
return(
    <DoctorContext.Provider value={value}>
        {props.children}
    </DoctorContext.Provider>
)
}

export default DoctorContextProvider;