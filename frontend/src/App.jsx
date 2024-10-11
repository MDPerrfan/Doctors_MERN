import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar'
import Home from './Pages/Home'
import Doctors from './Pages/Doctors'
import About from './Pages/About'
import Contact from './Pages/Contact'
import MyAppointments from './Pages/MyAppointments'
import MyProfile from './Pages/MyProfile'
import Login from './Pages/Login'
import Footer from './Components/Footer/Footer'
import Appointments from './Pages/Appointments'
const App = () => {
  return (
    <>
      <div className='mx-4 sm:mx-[10%]'>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/doctors' element={<Doctors />} />
          <Route path='/doctors/:speciality' element={<Doctors />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/my-appointments' element={<MyAppointments />} />
          <Route path='appointments/:docId' element={<Appointments/>}/>
          <Route path='/profile' element={<MyProfile />} />
          <Route path='/login' element={<Login/>}/>
        </Routes>
        <Footer/>
      </div>
    </>
  )
}

export default App
