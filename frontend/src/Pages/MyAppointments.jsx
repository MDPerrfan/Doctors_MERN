import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
const MyAppointments = () => {
  const { doctors } = useContext(AppContext);
  return (
    <div>
      <p className='font-medium pb-3 mt-15 text-gray-600 border-b '>My appointments</p>
      <div>
        {
          doctors.slice(0, 2).map((item, index) => (
            <div className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b' key={index}>
              <div>
                <img className='w-32 bg-orange-50' src={item.image} alt="img" />
              </div>
              <div className='flex-1 text-sm text-zinc-500'>
                <p className='text-neutral-800 font-semibold'>{item.name}</p>
                <p>{item.speciality}</p>
                <p className='text-zinc-700 font-medium mt-2'>Address</p>
                <p className='text-xs'>{item.address.line1}</p>
                <p className='text-xs'>{item.address.line2}</p>
                <p className='text-xs mt-1'><span className='text-sm text-neutral-700 font-medium'>Date & Time:</span>11,OCT,2024 | 3:36 PM</p>
              </div>
              <div></div>
              <div className='flex flex-col justify-end gap-2'>
                <button className='sm:min-w-48 py-2 bg-primary rounded-xl text-sm text-white'>Pay Online</button>
                <button className='sm:min-w-48 py-2 bg-gray-200 rounded-xl text-sm hover:text-red-700'>Cancel appointment</button>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default MyAppointments
