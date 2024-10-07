import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'

const Appointments = () => {
  const {docId}=useParams()
  const {doctors}=useContext(AppContext);
  const [docInfo,setDocInfo]=useState(null)

  const fetchDocInfo=async()=>{
    const docInfo=doctors.find(doc=>doc._id===docId);
    setDocInfo(docInfo);
    console.log(docInfo);

  }
  useEffect(()=>{
    fetchDocInfo();
  },[doctors,docId])
  return docInfo && (
    <div>
      <div className='flex flex-col sm:flex-row gap-4 pt-3'>
        <div>
          <img className='bg-primary w-full sm:max-w-72 rounded-lg' src={docInfo.image} alt="img" />
        </div>
        <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0'>
          <p className='flex items-center gap-2 text-xl font-medium text-gray-600'>
            {docInfo.name}
            <img className='w-5' src={assets.verified_icon} alt="img" />
          </p>
          <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
            <p>{docInfo.degree} - {docInfo.speciality}</p>
            <button className='py-0.5 px-2 border rounded-full'>{docInfo.experience}</button>
          </div>
          <div>
            <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'>About <img src={assets.info_icon} alt="" /></p>
            <p className='text-sm text-gray-500 max-w-[700px] mt-1'>{docInfo.about}</p>
          </div>
          <p>Appointment fee: <span>{docInfo.fees}</span></p>
        </div>
      </div>
    </div>
  )
}

export default Appointments
