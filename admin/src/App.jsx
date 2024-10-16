import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useContext } from 'react'
import Login from './Pages/Login'
import { AdminContext } from './Context/AdminContext';

const App = () => {
  const { adminToken } = useContext(AdminContext)
  return adminToken ? (
    <div>
      <ToastContainer />
    </div>
  ) : (
    <>
      <Login />
      <ToastContainer />
    </>
  )
}

export default App
