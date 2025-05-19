import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../../context/AppContext';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors, loading } = useContext(AppContext);

  return (
    <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10'>
      <h1 className='text-3xl font-medium'>Top Doctors</h1>
      <p className='sm:w-1/3 text-center text-sm'>Simply browse through our extensive doctors list</p>

      <div className='w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
        {
          loading ? (
            Array(12).fill(0).map((_, index) => (
              <div className='border border-green-900 rounded-xl overflow-hidden' key={index}>
                <Skeleton height={160} className='w-full' />
                <div className='p-4'>
                  <Skeleton width={80} height={12} />
                  <Skeleton width={120} height={20} style={{ marginTop: '8px' }} />
                  <Skeleton width={100} height={14} />
                </div>
              </div>
            ))
          ) : (
            doctors.slice(0, 12).map((item, index) => (
              <div onClick={() => { navigate(`/appointments/${item._id}`); scrollTo(0, 0) }} className='border border-green-900 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500' key={index}>
                <img className='bg-orange-100' src={item.image} alt="doc_img" />
                <div className='p-4'>
                  {item.availabe && (
                    <div className='flex items-center gap-2 text-sm text-center text-green-950'>
                      <p className='w-2 h-2 bg-green-400 rounded-full border-green-900'></p>
                      <p>Available</p>
                    </div>
                  )}
                  <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                  <p className='text-gray-600 text-sm'>{item.speciality}</p>
                </div>
              </div>
            ))
          )
        }
      </div>

      {!loading && (
        <button onClick={() => { navigate('/doctors'); scrollTo(0, 0) }} className='bg-gray-100 px-12 py-3 rounded-full mt-9'>
          more
        </button>
      )}
    </div>
  )
}

export default TopDoctors

