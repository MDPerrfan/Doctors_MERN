import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../Context/AdminContext'
import axios from 'axios'
import { toast } from 'react-toastify'
const Login = () => {
  const [state, setState] = useState("Admin");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const { setAdminToken, backendUrl } = useContext(AdminContext)

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if(state==='Admin'){
        const {data}= await axios.post(backendUrl+'/api/admin/login',{email,password})
        if(data.success){
          localStorage.setItem('adminToken',data.token)
          setAdminToken(data.token)
          toast.success('Login successful!');
        }else{
          if (error.response && error.response.status === 401) {
            toast.error(error.response.data.message || 'Login failed. Please try again.');
          } else {
            toast.error(error.message || 'An unexpected error occurred');
          }
        }
      }else{

      }
    } catch (error) {

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
