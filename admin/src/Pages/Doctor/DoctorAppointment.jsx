import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../Context/DoctorContext'

const DoctorAppointment = () => {
  const {docToken,appointments,getAppointments}=useContext(DoctorContext)
  useEffect(()=>{
    if(docToken){
      getAppointments();
    }
  },[docToken])
  return (
    <div>
      
    </div>
  )
}

export default DoctorAppointment
