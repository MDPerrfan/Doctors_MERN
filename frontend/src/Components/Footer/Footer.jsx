import React from 'react'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='md:mx-10'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
       {/*  left */}
        <div>
            <img className='mb-5 w-40' src={assets.logo} alt="logo" />
        <p className='text-sm w-full md:w-2/3 text-gray-600 leading-6'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maxime, aperiam.</p>
        </div>

        {/* center */}
        <div>
        <p className='text-xl font-medium mb-5'>Company</p>
        <ul className='flex flex-col gap-2 text-gray-600'>
            <li>Home</li>
            <li>About us</li>
            <li>Contact us</li>
            <li>Privacy & policy</li>
        </ul>
        </div>

        {/* right */}
        <div>
        <p className='text-xl font-medium mb-5'>Get in touch</p>
        <ul className='flex flex-col gap-2 text-gray-600'>
            <li>
                +880367727387
            </li>
            <li>mdperrfan@gmail.com</li>
        </ul>
        </div>
      </div>
      <div className='mb-10'>
        <hr />
        <p className='py-5 text-sm text-center'>Copyright 2024@ Parves.</p>
      </div>
    </div>
  )
}

export default Footer
