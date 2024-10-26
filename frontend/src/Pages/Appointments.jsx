import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import RelatedDoctors from '../Components/RelatedDoctors/RelatedDoctors'
import { toast } from 'react-toastify'
import axios from 'axios'

const Appointments = () => {
  const { docId } = useParams()
  const { doctors, currencySymbol, getDoctorsData, backendUrl, token } = useContext(AppContext);
  const [docInfo, setDocInfo] = useState(null)
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('')
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THURS','FRI','SAT']
  const navigate = useNavigate()
  const fetchDocInfo = async () => {
    const docInfo = doctors.find(doc => doc._id === docId);
    setDocInfo(docInfo);
  }
  const getAvailableSlots = async () => {
    let slots = [];
  
    let today = new Date();
    today.setHours(0, 0, 0, 0); // Set today's time to midnight to avoid timezone issues
  
    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);
  
      let dayOfWeek = daysOfWeek[currentDate.getDay()]; // Get correct day of the week
      let endTime = new Date(currentDate);
      endTime.setHours(21, 0, 0, 0);
  
      if (i === 0) { // If today
        currentDate.setHours(Math.max(currentDate.getHours() + 1, 10));
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }
  
      let timeSlots = [];
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        let day = currentDate.getDate()
        let month = currentDate.getMonth()+1;
        let year= currentDate.getFullYear()

        const slotDate=day + "_" + month + "_" + year
        const slotTime = formattedTime
        console.log(docInfo.slots_booked)
        const isSlotAvailable = docInfo.slots_booked[slotDate] &&docInfo.slots_booked[slotDate].includes(slotTime)?false:true;
        if(isSlotAvailable){
          timeSlots.push({
            datetime: new Date(currentDate),
            day: dayOfWeek, // Add day of the week to each slot
            date: currentDate.toDateString(), // Add the exact date
            time: formattedTime,
          });
        }
        
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
      slots.push(timeSlots);
    }
  
    setDocSlots(slots);
  };
  
  const bookAppointment = async () => {
    if (!token) {
      toast.warn("Login to book appointment")
      return navigate('/login');
    }
    try {
      const date = docSlots[slotIndex][0].datetime
      let day = date.getDate()
      let month = date.getMonth() +1
      let year = date.getFullYear()
      const slotDate = day + "_" + month + "_" + year;

      const { data } = await axios.post(backendUrl + '/api/user/book-appointment', { docId, slotDate, slotTime }, { headers: { token } })
      if (data.success) {
        toast.success(data.message)
        getDoctorsData()
        navigate('/my-appointments')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);
  useEffect(() => {
    getAvailableSlots()
  }, [docInfo])
  return docInfo && (
    <div>
      <div className='flex flex-col sm:flex-row gap-4 pt-3'>
        <div>
          <img className='bg-primary w-full sm:max-w-72 rounded-lg' src={docInfo.image} alt="img" />
        </div>
        <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0'>
          <p className='flex items-center gap-2 text-xl font-medium text-gray-600'>
            {docInfo.name}
            <img className='w-5' src={assets.verified_icon} alt="img" />
          </p>
          <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
            <p>{docInfo.degree} - {docInfo.speciality}</p>
            <button className='py-0.5 px-2 border rounded-full'>{docInfo.experience}</button>
          </div>
          <div>
            <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'>About <img src={assets.info_icon} alt="" /></p>
            <p className='text-sm text-gray-500 max-w-[700px] mt-1'>{docInfo.about}</p>
          </div>
          <p className='text-gray-500 font-medium mt-4'>Appointment fee: <span className='text-gray-600'>{currencySymbol}{docInfo.fees}</span></p>
        </div>

      </div>
      <div className='sm:ml-72 sm:pl-4 font-medium text-gray-700'>
        <p>Booking Slots</p>
        <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
          {docSlots.length && docSlots.map((item, index) => (
            <div onClick={() => setSlotIndex(index)} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-primary text-white' : 'border border-gray-300'}`} key={index}>
              <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
              <p>{item[0] && item[0].datetime.getDate()}</p>
            </div>
          ))}
        </div>
        <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
          {docSlots.length && docSlots[slotIndex].map((item, index) => (
            <p onClick={() => setSlotTime(item.time)} className={`text-sm font-light flex-shrink-0 px-5 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-primary text-white' : 'border border-gray-300'}`} key={index}>
              {
                item.time.toLowerCase()
              }
            </p>
          ))}
        </div>
        <button onClick={bookAppointment} className='bg-primary text-white text-sm font-light rounded-full py-3 px-14 mt-6'>Book an appointment</button>
      </div>
      {/*Listing related Doctors*/}
      <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
    </div>
  )
}

export default Appointments
