import { createContext } from "react";
export const AppContext = createContext()
const AppContextProvider = (props) => {
    const calculateAge = (dob) => {
        const today = new Date()
        const birthDate = new Date(dob)
        let age = today.getFullYear() - birthDate.getFullYear()
        return age;
    }
    const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

    const slotDateFormat = (slotDate) => {
        const [day, month, year] = slotDate.split('_');
        return `${day} ${months[parseInt(month) - 1]} ${year}`;
    };
    
    const value = {
        calculateAge,
        slotDateFormat
    }
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;