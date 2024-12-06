import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const MyAppointments = () => {
  const { backendUrl, token,getDoctorsData } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);
  const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

  const slotDateFormat = (slotDate) => {
    const [day, month, year] = slotDate.split('_');
    return `${day} ${months[parseInt(month) - 1]} ${year}`;
  };

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/user-appointment`, { headers: { token } });
      if (data.success) {
        setAppointments(data.appointment.reverse());
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);

  const handlePayment = (appointmentId) => {
    // Logic for handling payment
    console.log(`Payment initiated for appointment ID: ${appointmentId}`);
  };

  const handleCancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/user/cancel-appointment', { appointmentId }, { headers: { token } })
      if (data.success) {
        toast.success(data.message)
        getUserAppointments()
        getDoctorsData()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <p className='font-medium pb-3 mt-15 text-gray-600 border-b '>My appointments</p>
      <div>
        {
          appointments.slice(0, 2).map((item, index) => (
            <div className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b' key={index}>
              <div>
                <img className='w-32 bg-orange-50' src={item.docData.image} alt="Doctor" />
              </div>
              <div className='flex-1 text-sm text-zinc-500'>
                <p className='text-neutral-800 font-semibold'>{item.docData.name}</p>
                <p>{item.docData.speciality}</p>
                <p className='text-zinc-700 font-medium mt-2'>Address</p>
                <p className='text-xs'>{item.docData.address.line1}</p>
                <p className='text-xs'>{item.docData.address.line2}</p>
                <p className='text-xs mt-1'>
                  <span className='text-sm text-neutral-700 font-medium'>Date & Time:</span> {slotDateFormat(item.slotDate)} | {item.slotTime}
                </p>
              </div>
              <div className='flex flex-col justify-end gap-2 '>
                {!item.cancelled&& !item.isCompleted&&<button
                  onClick={() => handlePayment(item.id)}
                  className='sm:min-w-48 py-2 bg-primary rounded-xl text-sm text-white'>
                  Pay Online
                </button>}

                {
                  !item.cancelled &&!item.isCompleted&&
                  <button
                    onClick={() => handleCancelAppointment(item._id)}
                    className='sm:min-w-48 my-3 py-2 bg-gray-200 rounded-xl text-sm  hover:bg-red-500 hover:text-white'>
                    Cancel appointment
                  </button>
                }
                {
                  item.cancelled && !item.isCompleted&&<p className='text-sm text-gray-600 border rounded p-3 bg-red-100'>Appointment has been cancelled</p>
                }

              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default MyAppointments;
