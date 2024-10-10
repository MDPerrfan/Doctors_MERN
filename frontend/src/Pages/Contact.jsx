import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div className='flex flex-col items-center mt-2 md:mt-6'>
      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p>CONTACT <span className='text-gray-600'>US</span></p>
      </div>
      <div className='my-10 flex flex-col md:flex-row text-sm gap-14  mb-28 '>
          <img className='w-full md:max-w-[300px] rounded-full' src={assets.contact_image} alt="img" />
          <div className='flex flex-col justify-center items-start gap-6'>
            <p className='font-semibold text-lg text-gray-600 '>OUR OFFICE</p>
            <p className='text-gray-500'>Lorem ipsum dolor sit, amet <br /> consectetur adipisicing elit. Atque.</p>
            <p className='text-gray-500'>Tel:0309403049 <br />Email:mdperrfan@gmail.com</p>
            <p className='font-semibold text-lg text-gray-600 '>Careers at MDP</p>
            <p className='text-gray-500'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolore, nostrum!</p>
            <button className='border text-gray-700 border-r-2 py-2 px-8 rounded-lg text-sm hover:bg-black hover:text-white transition-all'>Explore Jobs</button>
          </div>
        </div>
    </div>
  )
}

export default Contact
