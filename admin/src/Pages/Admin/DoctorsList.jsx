import  { useContext, useEffect } from 'react'
import { AdminContext } from '../../Context/AdminContext'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
const DoctorsList = () => {
  const { doctors, adminToken, getAllDoctors,changeAvailibility,loading } = useContext(AdminContext);

  useEffect(() => {
    if (adminToken) {
        getAllDoctors()
    }
  }, [adminToken])
  if(loading){
    return(
       <div className='m-5 max-h-[90vh] overflow-y-scroll'>
        <h1 className='text-lg font-medium mb-4'>All Doctors</h1>
        <div className='w-full flex flex-wrap gap-4 pt-5 gap-y-3'>
          {Array(6).fill().map((_, i) => (
            <div key={i} className='border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer'>
              <Skeleton height={150} className='w-full min-w-48' />
              <div className='p-4'>
                <Skeleton height={20} width={`80%`} className='mb-2' />
                <Skeleton height={14} width={`60%`} className='mb-2' />
                <div className='mt-2 flex items-center gap-2 text-sm'>
                  <Skeleton circle height={16} width={16} />
                  <Skeleton height={12} width={`30%`} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
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
