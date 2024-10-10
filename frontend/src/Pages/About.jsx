import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 text-gray-600'>
        <p>ABOUT <span className='text-gray-700'>US</span></p>
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-20 items-center justify-center'>
        <img className='w-full md:max-w-[300px] rounded-full' src={assets.about_image} alt="about" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-500'>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia, distinctio!</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, fugit? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deserunt, quod?</p>
          <b className='text-gray-800'>Our vision</b>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis, cupiditate.</p>
        </div>
      </div>
      <div className='text-xl my-14'>
        <p className='text-gray-600'>WHY CHOOSE <b className='text-gray-700'>US</b></p>
      </div>
      <div className='flex flex-col md:flex-row mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer text-gray-500'>
          <b>Speciality:</b>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ex, velit!</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer text-gray-500'>
          <b>Convenience:</b>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt, iste!</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer text-gray-500'>
          <b>Personalization:</b>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, accusantium?</p>
        </div>
      </div>
    </div>
  )
}

export default About
