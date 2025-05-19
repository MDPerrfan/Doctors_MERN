import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const AdminContext = createContext()

const AdminContextProvider = (props) => {
    const [adminToken, setAdminToken] = useState(localStorage.getItem('adminToken') ? localStorage.getItem('adminToken') : '')
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [doctors, setDoctors] = useState([]);
    const [appointments, setAppointments] = useState([])
    const [loading,setLoading]=useState()
    const [dashData, setDashdata] = useState(false);

    const getAllDoctors = async () => {
        try {
            setLoading(true)
            const { data } = await axios.post(backendUrl + '/api/admin/all-doctor', {}, { headers: { adminToken } });
            if (data.success) {
                setDoctors(data.doctors);
                setLoading(false)
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
            console.log(error);
        }
    }
    const changeAvailibility = async (docId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/admin/change-availibility', { docId }, { headers: { adminToken } });
            if (data.success) {
                toast.success(data.message)
                getAllDoctors()
            } else {
                toast.error(data.message);
            }
        }
        catch (error) {
            toast.error(error.message);
            console.log(error);
        }
    }
    const getAllappointments = async () => {
        try {
            setLoading(true)
            const { data } = await axios.get(backendUrl + '/api/admin/appointments', { headers: { adminToken } })
            if (data.success) {
                setAppointments(data.appointments)
                setLoading(false)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message);
            console.log(error);
        }
    }
    const cancelAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(backendUrl + 'api/admin/cancel-appointments', { appointmentId }, { headers: { adminToken } })
            if (data.success) {
                toast.success(data.message)
                getAllappointments()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message);
        }
    }
    const getDashdata = async () => {
        setLoading(true)
        try {
            const { data } = await axios.get(backendUrl + '/api/admin/admin-dashboard', { headers: { adminToken } })
            if (data.success) {
                setDashdata(data.dashData)
                setLoading(false)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message);
        }
    }
    const value = {
        adminToken,
        setAdminToken,
        backendUrl,
        getAllDoctors,
        doctors,
        changeAvailibility,
        appointments, setAppointments,
        getAllappointments,
        cancelAppointment,
        dashData,getDashdata,
        loading,setLoading
    }
    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider;