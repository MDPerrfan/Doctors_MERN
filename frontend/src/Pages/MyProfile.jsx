import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'

const MyProfile = () => {
const {userData,setUserData,token,backendUrl,loadUserProfile}=useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false)
const[image,setImage]=useState(false)

  const address = userData.address || { line1: "", line2: "" };

  return userData &&(
    <div className='max-w-lg flex flex-col gap-2 text-sm'>
      <img className='max-w-44 rounded-full my-2' src={userData.image} alt="" />
      {
        isEdit
          ? <input className='bg-gray-200 text-3xl font-medium max-w-60 mt-4 rounded-lg' onChange={e => setUserData(prev => ({ ...prev, name: e.target.value }))} value={userData.name} type='text' />
          : <p className='font-medium text-3xl text-neutral-800 mt-4'>{userData.name}</p>
      }
      <hr className='bg-zinc-400 h-[1px] border-none' />
      <div>
        <p className='text-neutral-500 underline mt-3'>Contact info</p>
        <div className='grid grid-cols-[1fr_2fr] gap-y-3 mt-3 text-neutral-700'>
          <p className='font-medium'>Email id:</p>
          <p className='text-blue-950'>{userData.email}</p>
          <p className='font-medium'>Phone</p>
          {
            isEdit
              ? <input className='bg-gray-200 max-w-52  rounded-md p-1' onChange={e => setUserData(prev => ({ ...prev, phone: e.target.value }))} value={userData.phone} type='text' />
              : <p className='text-blue-900'>{userData.phone}</p>
          }
          <p className='font-medium'>Adress:</p>
          {
            isEdit
              ?<p>
              <input className='bg-gray-200 max-w-52 rounded-md p-1' onChange={e => setUserData(prev => ({ ...prev, address:{...prev.address,line1:e.target.value} }))} value={userData.address.line1} type='text' /><br/>
              <input className='bg-gray-200 max-w-52 mt-1 rounded-md p-1' onChange={e => setUserData(prev => ({ ...prev, address:{...prev.address,line2:e.target.value} }))}  value={userData.address.line2} type='text' />
              </p> 
              : <p className='text-gray-500'>{address.line1}<br/>{address.line2}</p>
          }
        </div>
      </div>
      <div>
        <p className='text-neutral-500 underline mt-3'>Basic information:</p>
        <div className='grid grid-cols-[1fr_2fr] gap-y-3 mt-3 text-neutral-700'>
          <p className='font-medium'>Gender:</p>
          {
            isEdit
              ?<select className='max-w-20 bg-gray-200  rounded-md p-1' onChange={e => setUserData(prev => ({ ...prev, gender: e.target.value }))} value={userData.gender} name="" id="">
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              : <p className='text-gray-500'>{userData.gender}</p>
          }
          <p className='font-medium'>Birthday:</p>
          {
            isEdit
              ? <input className='bg-gray-200 max-w-28  rounded-md p-1' onChange={e => setUserData(prev => ({ ...prev, dob: e.target.value }))} value={userData.dob} type='date' />
              : <p className='text-gray-500'>{userData.dob}</p>
          }
        </div>
      </div>
      <div>
        {
          isEdit
          ?<button className='border border-gray-300 py-1 px-5 rounded-2xl hover:bg-primary hover:text-white transition-all' onClick={()=>setIsEdit(false)}>Save</button>
          :<button className='border border-gray-300 py-1 px-5 rounded-2xl hover:bg-primary hover:text-white transition-all' onClick={()=>setIsEdit(true)}>Edit</button>
        }
      </div>
    </div>
  )
}

export default MyProfile
