import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../Context/AdminContext'

const DoctorsList = () => {
  const { doctors, adminToken, getAllDoctors,changeAvailibility } = useContext(AdminContext);

  useEffect(() => {
    if (adminToken) {
        getAllDoctors()
    }
  }, [adminToken])
  return (
    <div className='m-5 max-h-[90h] overflow-y-scroll'>
      <h1 className='text-lg font-medium'>All Doctors</h1>
      <div className='w-full flex flex-wrap gap-4 pt-5 gap-y-3'>
        {
          doctors.map((item,index)=>(
            <div className='border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer' key={index}>
              <img className= 'bg-indigo-50 hover:bg-primary transition-all duration-500' src={item.image} alt="docimg" />
              <div className='p-4'>
                <p className='text-neutral-800 text-lg font-medium'>{item.name}</p>
                <p className='text-zinc-500 text-sm'>{item.speciality}</p>
                <div className='mt-2 flex items-center gap-1 text-sm'>
                  <input onChange={()=>changeAvailibility(item._id)} type="checkbox" checked={item.availabe}/>
                  <p>Available</p>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default DoctorsList
