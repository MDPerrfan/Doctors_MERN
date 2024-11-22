import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../Context/DoctorContext'
import { AppContext } from '../../Context/AppContext'

const DoctorAppointment = () => {
  const { docToken, appointments, getAppointments } = useContext(DoctorContext)
  const { calculateAge,slotDateFormat } = useContext(AppContext)

  useEffect(() => {
    if (docToken) {
      getAppointments();
    }
  }, [docToken])
  return (
    <div className='w-full max-w-6xl m-5'>
      <p>All appointments</p>
      <div className='bg-white border rounded text-sm max-h[80vh] min-h-[50vh] overflow-y-scroll'>
        <div className='max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-1'>
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
            <div key={index} className="grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-1">
              <p>{index + 1}</p>
              <div className="flex items-center">
                <img src={item.userData.image} alt="Patient" className="w-8 h-8 rounded-full mr-2" />
                <p>{item.userData.name}</p>
              </div>
              <div>
                <p>{item.payment ? "Online" : "CASH"}</p>
              </div>
              <p>{calculateAge(item.userData.dob)}</p>
              <p>{slotDateFormat(item.slotDate)}</p>
              <p>{item.amount}</p>
              <button className="text-blue-500 underline">Action</button>
            </div>
          ))
        }

      </div>
    </div>
  )
}

export default DoctorAppointment
