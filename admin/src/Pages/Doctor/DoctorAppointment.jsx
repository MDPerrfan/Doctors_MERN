import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../Context/DoctorContext'
import { AppContext } from '../../Context/AppContext'
import { assets } from '../../assets/assets'

const DoctorAppointment = () => {
  const { docToken, appointments, getAppointments, completeAppointment, cancelAppointment } = useContext(DoctorContext)
  const { calculateAge, slotDateFormat } = useContext(AppContext)

  useEffect(() => {
    if (docToken) {
      getAppointments();
    }
  }, [docToken])
  return (
    <div className="w-full max-w-6xl m-5">
  <p className="text-lg font-semibold mb-4">All Appointments</p>
  <div className="bg-white border rounded text-sm max-h-[80vh] min-h-[50vh] overflow-y-scroll">
    {/* Header row - Hidden on small screens */}
    <div className="hidden sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1.5fr] gap-1 py-3 px-2 bg-gray-100 border-b">
      <p>#</p>
      <p>Patient</p>
      <p>Payment</p>
      <p>Age</p>
      <p>Date & Time</p>
      <p>Fees</p>
      <p>Action</p>
    </div>

    {/* Appointment items */}
    {appointments.map((item, index) => (
      <div
        key={index}
        className="sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1.5fr] gap-2 py-3 px-2 hover:bg-gray-50 border-b flex flex-col sm:flex-row"
      >
        {/* Index */}
        <p className="hidden sm:block">{index + 1}</p>

        {/* Patient info */}
        <div className="flex items-center gap-2">
          <img
            src={item.userData.image}
            alt="Patient"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <p className="font-medium">{item.userData.name}</p>
            <p className="text-xs text-gray-500 sm:hidden">Age: {calculateAge(item.userData.dob)}</p>
          </div>
        </div>

        {/* Payment */}
        <div className="flex items-center">
          <p
            className={`text-xs inline-block border px-2 py-1 rounded-full ${
              item.payment ? "border-green-500 text-green-500" : "border-gray-500 text-gray-500"
            }`}
          >
            {item.payment ? "Online" : "CASH"}
          </p>
        </div>

        {/* Age (visible on larger screens) */}
        <p className="hidden sm:block">{calculateAge(item.userData.dob)}</p>

        {/* Date & Time */}
        <p>{slotDateFormat(item.slotDate)}</p>

        {/* Fees */}
        <p>{item.amount}</p>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {item.cancelled ? (
            <p className="text-red-400 text-xs font-medium">Cancelled</p>
          ) : item.isCompleted ? (
            <p className="text-green-500 text-xs font-medium">Completed</p>
          ) : (
            <div className="flex gap-2">
              <img
                onClick={() => completeAppointment(item._id)}
                className="w-6 h-6 cursor-pointer"
                src={assets.tick_icon}
                alt="Complete"
              />
              <img
                onClick={() => cancelAppointment(item._id)}
                className="w-6 h-6 cursor-pointer"
                src={assets.cancel_icon}
                alt="Cancel"
              />
            </div>
          )}
        </div>
      </div>
    ))}
  </div>
</div>

  )
}

export default DoctorAppointment
