import { createContext } from "react";
import { useState } from "react";
import axios from 'axios'
import { toast } from 'react-toastify'

export const DoctorContext = createContext()
const DoctorContextProvider = (props) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [docToken, setDocToken] = useState(localStorage.getItem('doctoken') ? localStorage.getItem('doctoken') : '')
    const [appointments, setAppointments] = useState([])
    const getAppointments = async () => {
        try {
            const { data } = await axios.get(
                backendUrl + '/api/doctor/doc-appointments',
                { headers: { docToken } }
            );
            if (data.success) {
                setAppointments(data.appointments.reverse())
                console.log(appointments);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error)
        }
    }
    const value = {
        backendUrl,
        docToken,
        setDocToken,
        appointments,
        setAppointments,
        getAppointments
    }
    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )
}

export default DoctorContextProvider;