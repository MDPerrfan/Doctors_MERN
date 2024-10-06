import React from 'react'
import { assets } from '../../assets/assets'
import { useNavigate } from 'react-router-dom'

const Banner = () => {
    const navigate = useNavigate()
  return (
    <div className='flex   bg-primary rounded-md px-6 sm:px-10 md:px-14 lg:px-12 my-20 md:mx-10 '>
      <div className='flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5'>
        <div className='text-xl sm:text-2xl md:text-3xl lg:text-5xl text-white font-semibold'>
            <p>Book Appointment</p>
            <p className='mt-4'>with 100+ experienced doctors</p>
        </div>
        <button onClick={()=>{navigate('/login');scrollTo(0,0)}} className='bg-white text-sm sm:text-base text-gray-600 py-3 px-6 rounded-full mt-5 hover:scale-105 transition-all'>Create account</button>
      </div>
      <div className='hidden md:block md:w-1/2 relative lg:w-[370px]'>
        <img className='w-full absolute bottom-0 right-0 max-w-md' src={assets.appointment_img} alt="apnt img" />
      </div>
    </div>
  )
}

export default Banner
