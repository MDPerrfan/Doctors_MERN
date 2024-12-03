import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../Context/DoctorContext'

const DocProfile = () => {
  const {docToken,profileData,getProfileData}=useContext(DoctorContext)

  useEffect(()=>{
    getProfileData();
  },[docToken])
  return profileData &&(
    <div>
      <div  className='flex flex-col gap-4 m-5'>
        <div>
          <img className='bg-primary/80 w-full sm:max-w-64 rounded-lg' src={profileData.image} alt="" />
        </div>
        <div className='flex-1 border border-stone-100 rounded-lg bg-white p-8 py-7'>
          <p className='flex items-center gap-3 text-3xl font-medium text-gray-700'>{profileData.name}</p>
          <div className='flex items-center gap-2 mt-1 text-gray-600'>
            <p>{profileData.degree}-{profileData.speciality}</p>
            <button className='py-0.5 border text-xs rounded-full'>{profileData.experience}</button>
          </div>
          <div >
            <p className='flex items-center gap-2 text-sm font-medium text-neutral-800 mt-3'>About:{}</p>
            <p className='text-sm text-gray-600 max-w-[700px mt-1'>{profileData.about}</p>
          </div>
          <p className='flex items-center gap-2 text-sm font-medium text-neutral-800 mt-3'>
            Appointment fee: <span>{profileData.fees}</span>
          </p>
          <div>
            <p className='flex items-center gap-2 text-sm font-medium text-neutral-800 mt-3'>Address:</p>
            <p className='text-sm text-gray-600 max-w-[700px mt-1'>{profileData.address.line1}</p>
            <p className='text-sm text-gray-600 max-w-[700px mt-1'>{profileData.address.line2}</p>
          </div>
          <div className='flex gap-1 pt-2'>
            <input type="checkbox" />
            <label htmlFor="">Available</label>
          </div>
          <button className='py-1 px-5 border rounded-lg mt-2 bg-primary text-white'>Edit</button>
        </div>
      </div>
    </div>
  )
}

export default DocProfile
