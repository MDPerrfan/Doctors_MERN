import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../Context/DoctorContext'
import { AppContext } from '../../Context/AppContext'
import { assets } from '../../assets/assets'

const DoctorAppointment = () => {
  const { docToken, appointments, getAppointments, completeAppointment, cancelAppointment } = useContext(DoctorContext)
  const { calculateAge, slotDateFormat } = useContext(AppContext)

  useEffect(() => {
    if (docToken) {
      getAppointments();
    }
  }, [docToken])
  return (
    <div className='w-full max-w-6xl m-5'>
      <p>All appointments</p>
      <div className='bg-white border rounded text-sm max-h[80vh] min-h-[50vh] overflow-y-scroll'>
        <div className='max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1.5fr] gap-1 py-3 px-1'>
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>
        {
          appointments.map((item, index) => (
            <div key={index} className="max-sm:flex-wrap  grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1.5fr] gap-1 py-3 px-1 hover:bg-gray-50">
              <p className='max-sm:hidden'>{index + 1}</p>
              <div className="flex items-center gap-2">
                <img src={item.userData.image} alt="Patient" className="w-8 h-8 rounded-full mr-2 " />
                <p>{item.userData.name}</p>
              </div>
              <div >
                <p className='text-xs inline-block border border-primary px-2 rounded-full'>{item.payment ? "Online" : "CASH"}</p>
              </div>
              <p className='max-sm:hidden'>{calculateAge(item.userData.dob)}</p>
              <p>{slotDateFormat(item.slotDate)}</p>
              <p>{item.amount}</p>
              {
                item.cancelled ? <p>Cancelled</p>
                  : item.isCompleted ? <p>Completed</p>
                    : <div className='flex '>
                      <img onClick={() => completeAppointment(item._id)} className='w-9 cursor-pointer' src={assets.tick_icon} alt="" />
                      <img onClick={() => cancelAppointment(item._id)} className='w-9 cursor-pointer' src={assets.cancel_icon} alt="" />
                    </div>
              }
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default DoctorAppointment
