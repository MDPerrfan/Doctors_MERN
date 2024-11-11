import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../Context/AdminContext'
import { assets } from '../../assets/assets'
import { AppContext } from '../../Context/AppContext'

const Dashboard = () => {
  const { dashData, getDashdata, cancelAppointment, adminToken } = useContext(AdminContext)
  const { slotDateFormat } = useContext(AppContext)
  useEffect(() => {
    if (adminToken) {
      getDashdata();
    }
  }, [adminToken])
  return dashData && (
    <div className='m-5'>
      <div className='flex flex-wrap gap-3'>
        <div className='flex items-center gap-2 bg-white p-4 rounded min-w-52 border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src={assets.doctor_icon} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashData.doctors}</p>
            <p className='text-gray-400'>Doctors</p>
          </div>
        </div>
        <div className='flex items-center gap-2 bg-white p-4 rounded min-w-52 border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src={assets.appointment_icon} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashData.appointments}</p>
            <p className='text-gray-400'>Appointments</p>
          </div>
        </div>
        <div className='flex items-center gap-2 bg-white p-4 rounded min-w-52 border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src={assets.patients_icon} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashData.patients}</p>
            <p className='text-gray-400'>Pateints</p>
          </div>
        </div>
      </div>

      <div className='bg-white'>
        <div className='flex items-center gap-2 px-4 py-4 mt-10 rounded-t border'>
          <img src={assets.list_icon} alt="" />
          <p className='font-semibold'>Latest Booking</p>
        </div>
        <div className='pt-4 border border-t-0'>
          {
            dashData.latestAppointments.map((item, index) => (
              <div key={index} className='flex items-center justify-between gap-4 p-4 border-b'>
                <div className='flex gap-1'>
                  <img src={item.docData.image} alt="Doctor" className='w-12 h-12 rounded-full' />
                  <div>
                    <p className='font-semibold'>{item.docData.name}</p>
                    <p className='text-gray-500'>Booking on :{slotDateFormat(item.slotDate)}</p>
                  </div>
                </div>
                <div className="flex items-end mx-2">
                  {item.cancelled ? <p className='text-red-400 text-xs font-medium'>Cancelled</p> : <img onClick={() => cancelAppointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />
                  }
                </div>
              </div>
            ))
          }
        </div>

      </div>
    </div>
  )
}

export default Dashboard
