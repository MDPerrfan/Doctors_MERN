import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const [state, setState] = useState("Login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setUserName] = useState("");
  const navigate = useNavigate()
  const { backendUrl, token, setToken } = useContext(AppContext)
  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      if (state === 'Sign Up') {
        const { data } = await axios.post(backendUrl + '/api/user/register', { name, email, password })
        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
        } else {
          toast.error(data.message)
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/user/login', { email, password })
        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
        } else {
          toast.error(data.message)
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  }
  useEffect(() => {
    if (token) {
      navigate('/')
    }
  })
  return (
    <form className='min-h-[80vh] flex items-center' onSubmit={onSubmit}>
      <div className='flex flex-col gap-2 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg'>
        <p className='text-2xl font-semibold'>{state === 'Login' ? "Login" : "Sign Up"}</p>
        <p>Please {state === 'Login' ? "login" : "sign up"}to book appointment</p>
        {
          state === "Sign Up" ? <div className='w-full'>
            <p>Full name</p>
            <input className='border border-zinc-300 w-full p-2 mt-1 rounded-lg' onChange={(e) => setUserName(e.target.value)} value={name} type="text" />
          </div> : ""
        }

        <div className='w-full'>
          <p>Email</p>
          <input className='border border-zinc-300 w-full p-2 mt-1 rounded-lg' onChange={(e) => setEmail(e.target.value)} value={email} type="email" />
        </div>
        <div className='w-full'>
          <p>Password</p>
          <input className='border border-zinc-300 w-full p-2 mt-1 rounded-lg' onChange={(e) => setPassword(e.target.value)} value={password} type="password" />
        </div>
        <button type='submit' className='bg-primary text-white w-full py-2 rounded-md text-base mt-2'>{state === 'Login' ? "Login" : "Create account"}</button>
        {state === "Sign Up" ? <p>Already have an account? <span onClick={() => setState('Loign')} className='cursor-pointer text-primary underline'>Login here</span></p>
          :
          <p>Create an new account? <span onClick={() => setState('Sign Up')} className='cursor-pointer text-primary underline'>Click here</span></p>
        }
      </div>
    </form>
  )
}

export default Login
