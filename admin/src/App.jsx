import React, { useContext } from 'react'
import Login from './Pages/Login'
import { AdminContext } from './Context/AdminContext';
import Navbar from './Components/Navbar';
import Sidebar from './Components/Sidebar';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './Pages/Admin/Dashboard';
import AllAppointments from './Pages/Admin/AllAppointments';
import AddDoctor from './Pages/Admin/AddDoctor';
import DoctorsList from './Pages/Admin/DoctorsList';
import { DoctorContext } from './Context/DoctorContext';
import DocDashboard from './Pages/Doctor/DocDashboard';
import DocProfile from './Pages/Doctor/DocProfile';
import DoctorAppointment from './Pages/Doctor/DoctorAppointment'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  const { adminToken } = useContext(AdminContext)
  const { docToken } = useContext(DoctorContext);
  return adminToken || docToken ? (
    <div className='bg-[#f3f4fb]'>
      <ToastContainer />
      <Navbar />
      <div className='flex items-start'>
        <Sidebar />
        <Routes>
          {/*admin routes*/}
          <Route path='/' element={<></>} />
          <Route path='/admin-dashboard' element={<Dashboard />} />
          <Route path='/all-appointments' element={<AllAppointments />} />
          <Route path='/add-doctor' element={<AddDoctor />} />
          <Route path='/doctor-list' element={<DoctorsList />} />

          {/* doctor routes */}
          <Route path='/doctor-dashboard' element={<DocDashboard />} />
          <Route path='/doctor-profile' element={<DocProfile />} />
          <Route path='/doctor-appointments' element={<DoctorAppointment />} />
        </Routes>
      </div>
    </div>
  ) : (
    <>
      <Login />
      <ToastContainer />
    </>
  )
}

export default App
