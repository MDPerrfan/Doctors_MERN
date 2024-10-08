import React from 'react'
import { assets } from '../../assets/assets'
const Header = () => {
  return (
    <div className='flex flex-col md:flex-row flex-wrap  md:px-10 lg:px-20 bg-primary rounded-lg my-2'>
      {/*left side */}
      <div className='md:w-1/2 flex flex-col items-start justify-center gap-4 p-4 m-auto md:py-[10vw] md:mb-[-30px]'>
        <p className='text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight'>
          Book Appointment <br /> with Trusted Doctors
        </p>
        <div className='flex flex-col md:flex-row justify-center items-start gap-1'>
          <img className='w-28' src={assets.group_profiles} alt="group_profiles" />
          <p className='text-white font-light text-sm'>Simply browse through out extensive list of trusted doctors, <br className='hidden sm:block' /> shcedule your appointment hassle free.</p>
        </div>
        <a className='py-4 px-7 bg-white rounded-full font-small flex text-gray-600 gap-2 text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300' href="#speciality">
          Book appointment <img className='w-3' src={assets.arrow_icon} alt="arr" />
        </a>
      </div>

      {/* right side */}
      <div className='md:w-1/2 relative '>
        <img className='w-full md:absolute bottom-0 h-auto rounded-lg' src={assets.header_img} alt="header" />
      </div>
    </div>
  )
}

export default Header
