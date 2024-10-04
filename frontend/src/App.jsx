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
const App = () => {
  return (
    <>
      <div className='mx-4 sm:mx-[10%]'>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/doctors' element={<Doctors />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/appointment' element={<MyAppointments />} />
          <Route path='/profile' element={<MyProfile />} />
          <Route path='/login' element={<Login/>}/>
        </Routes>
      </div>
    </>
  )
}

export default App
