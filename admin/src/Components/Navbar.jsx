import React, { useContext } from 'react'
import {useNavigate} from 'react-router-dom'
import { assets } from '../assets/assets'
import { AdminContext } from '../Context/AdminContext'
import { DoctorContext } from '../Context/DoctorContext'
import { toast } from 'react-toastify'

const Navbar = () => {
    const {adminToken, setAdminToken} = useContext(AdminContext)
    const {docToken, setDocToken} = useContext(DoctorContext)
    const navigate = useNavigate()

    const logout = () => {
        if (adminToken) {
            localStorage.removeItem('adminToken')
            setAdminToken('')
        }
        if (docToken) {
            localStorage.removeItem('doctoken')
            setDocToken('')
        }
        toast.success('Logged out successfully')
        navigate('/')
    }
  return (
    <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white'>
      <div className='flex items-center gap-2 text-xs'>
        <img className='w-36 cursor-pointer' src={assets.logo} alt="" />
        <p className='border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600'>{adminToken?"Admin":"Doctor"}</p>
      </div>
      <button onClick={logout} className='bg-primary text-white text-sm px-8 py-2 rounded-full'>Logout</button>
    </div>
  )
}

export default Navbar
