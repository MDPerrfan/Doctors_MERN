import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const AdminContext = createContext()

const AdminContextProvider = (props) => {
    const [adminToken, setAdminToken] = useState(localStorage.getItem('adminToken') ? localStorage.getItem('adminToken') : '')
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [doctors, setDoctors] = useState([]);

    const getAllDoctors = async () => {
        try {
            const { data } = await axios.post(backendUrl + '/api/admin/all-doctor', {}, { headers: { adminToken } });
            if (data.success) {
                setDoctors(data.doctors);
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
    const value = {
        adminToken,
        setAdminToken,
        backendUrl,
        getAllDoctors,
        doctors,
        changeAvailibility
    }
    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider;