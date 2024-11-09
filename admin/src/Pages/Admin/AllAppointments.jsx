import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../../Context/AdminContext'
import { useEffect } from 'react'
import { AppContext } from '../../Context/AppContext'
import {assets} from '../../assets/assets'
const AllAppointments = () => {
  const { adminToken, appointments, getAllappointments,cancelAppointments } = useContext(AdminContext)
  const { calculateAge, slotDateFormat } = useContext(AppContext)
  useEffect(() => {
    if (adminToken) {
      getAllappointments()
    }
  }, [adminToken])
  return (
    <div className='w-full max-w-6xl m-5 '>
      <p className='mb-3 font-medium text-lg'>All Appointments</p>
      <div className='bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll'>
        <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6'>
          <p>#</p>
          <p>Patient name</p>
          <p>age</p>
          <p>date & time</p>
          <p>Doctor name</p>
          <p>Fee</p>
          <p>Actions</p>
        </div>
        {appointments.map((item, index) => (
          <div className='flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50' key={index}>
            <p className='max-sm:hidden'>{index + 1}</p>
            <div className='flex items-center gap-2'>
              <img className='w-8 rounded-full' src={item.userData.image} alt="" />
              <p>{item.userData.name}</p>
            </div>
            <p>{calculateAge(item.userData.dob)}</p>
            <p>{slotDateFormat(item.slotDate)},{item.slotTime}</p>
            <div className='flex items-center gap-2'>
              <img className='w-8 rounded-full bg-gray-300' src={item.docData.image} alt="" />
              <p>{item.docData.name}</p>
            </div>
            <p>{item.docData.fees}</p>

            <div className="flex items-center gap-2">
              {item.cancelled? <p className='text-red-400 text-xs font-medium'>Cancelled</p>:<img onClick={cancelAppointments(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />
            }
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AllAppointments
