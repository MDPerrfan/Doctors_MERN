import React, { useContext, useState } from 'react'
import { AdminContext } from '../Context/AdminContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { DoctorContext } from '../Context/DoctorContext'

const Login = () => {
  const [state, setState] = useState("Admin");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const { setAdminToken, backendUrl } = useContext(AdminContext)
  const {setDocToken} = useContext(DoctorContext)

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if(state === 'Admin'){
        const {data} = await axios.post(backendUrl+'/api/admin/login', {email, password})
        if(data.success){
          localStorage.setItem('adminToken', data.token)
          setAdminToken(data.token)
          toast.success('Login successful!')
        } else {
          toast.error(data.message || 'Login failed')
        }
      } else {
        const {data} = await axios.post(backendUrl+'/api/doctor/login', {email, password})
        if(data.success){
          localStorage.setItem('doctoken', data.token)
          setDocToken(data.token)
          toast.success('Login successful!')
        } else {
          toast.error(data.message || 'Login failed')
        }
      }
    } catch (error) {
      console.error('Login error:', error)
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        toast.error(error.response.data.message || 'Login failed. Please check your credentials.')
      } else if (error.request) {
        // The request was made but no response was received
        toast.error('No response from server. Please try again.')
      } else {
        // Something happened in setting up the request that triggered an Error
        toast.error('An error occurred. Please try again.')
      }
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[98vh] flex items-center' >
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[350px] m:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
        <p className='text-2xl font-semibold m-auto'><span className='text-primary'>{state}</span> Login</p>
        <div>
          <p>Email</p>
          <input value={email} onChange={(e) => setEmail(e.target.value)} className='p-2 bg-gray-500 w-72 rounded-xl text-white outline-primary' type="email" required />
        </div>
        <div>
          <p>Password</p>
          <input value={password} onChange={(e) => setPassword(e.target.value)} className='p-2 bg-gray-500 w-72 rounded-xl text-white outline-primary' type="password" required />
        </div>
        <button className='py-2 px-8 bg-primary rounded-2xl text-white'>Login</button>
        {
          state === "Admin"
            ? <p>Doctor Login <span className='text-primary cursor-pointer' onClick={() => setState("Doctor")}>Click here</span></p>
            : <p>Admin Login <span className='text-primary cursor-pointer' onClick={() => setState("Admin")}>Click here</span></p>
        }
      </div>
    </form>
  )
}

export default Login
