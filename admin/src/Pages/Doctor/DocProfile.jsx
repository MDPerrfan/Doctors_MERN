import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../Context/DoctorContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const DocProfile = () => {
  const {docToken,profileData,setProfileData,getProfileData,backendUrl}=useContext(DoctorContext)
const [isEdit,setIsEdit]=useState(false)
const updateProfile =async()=>{
  try{
const updateData = {
  address:profileData.address,
  availabe:profileData.availabe,
  fees:profileData.fees 
}
const {data }= await axios.post(backendUrl+'/api/doctor/update-profile',updateData,{headers:{docToken}})
if(data.success){
  toast.success(data.message)
  setIsEdit(false)
  getProfileData()
}else{
  toast.error(data.message);
}
  }catch(error){
    console.log(error)
  }
}
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
            Appointment fee: <span>{isEdit?<input type="number" value={profileData.fees} onChange={(e)=>setProfileData(prev=>({...prev,fees:e.target.value}))}/>:profileData.fees}</span>
          </p>
          <div>
            <p className='flex items-center gap-2 text-sm font-medium text-neutral-800 mt-3'>Address:</p>
            <p className='text-sm text-gray-600 max-w-[700px mt-1'>{isEdit?<input type="text" value={profileData.address.line1} onChange={(e)=>setProfileData(prev=>({...prev,address:{...prev.address,line1:e.target.value}}))} />:profileData.address.line1}</p>
            <p className='text-sm text-gray-600 max-w-[700px mt-1'>{isEdit?<input type="text" value={profileData.address.line2} onChange={(e)=>setProfileData(prev=>({...prev,address:{...prev.address,line2:e.target.value}}))} />:profileData.address.line2}</p>
            </div>
          <div className='flex gap-1 pt-2'>
            <input onChange={()=>isEdit && setProfileData(prev=>({...prev,availabe:!prev.availabe}))} checked={profileData.availabe} type="checkbox" />
            <label htmlFor="">Available</label>
          </div>
          {
            isEdit?<button onClick={updateProfile} className='py-1 px-5 border rounded-lg mt-2 hover:bg-primary hover:text-white'>Save</button>
            :<button onClick={()=>{setIsEdit(true)}} className='py-1 px-5 border rounded-lg mt-2 hover:bg-primary hover:text-white'>Edit</button>

          }

        </div>
      </div>
    </div>
  )
}

export default DocProfile
