import React, { useContext } from 'react'
import { AdminContext } from '../Context/AdminContext'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const Sidebar = () => {
    const {adminToken}=useContext(AdminContext)

  return (
    <div className='min-h-screen bg-white border-r'>
      {
        adminToken && 
        <ul className='text-gray-600 mt-5'>
            <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive?'bg-gray-400 border-r-4 border-primary text-white':''}`} to={'/admin-dashboard'}>
                <img src={assets.home_icon} alt="" />
                <p>Dashboard</p>
            </NavLink>
            <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive?'bg-gray-400 border-r-4 border-primary text-white':''}`} to={'/all-appointments'}>
                <img src={assets.appointment_icon} alt="" />
                <p>All appointments</p>
            </NavLink>
            <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive?'bg-gray-400 border-r-4 border-primary text-white':''}`} to={'/add-doctor'}>
                <img src={assets.add_icon} alt="" />
                <p>Add Doctor</p>
            </NavLink>
            <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive?'bg-gray-400 border-r-4 border-primary text-white':''}`} to={'/doctor-list'}>
                <img src={assets.people_icon} alt="" />
                <p>Doctor List</p>
            </NavLink>
        </ul>
      }
    </div>
  )
}

export default Sidebar
