import React, { useState } from 'react'
const Login = () => {
  const [state, setState] = useState("Login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault()

  }
  return (
    <form className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-2 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg'>
        <p className='text-2xl font-semibold'>{state === 'Login' ? "Login" : "Sign Up"}</p>
        <p>Please {state === 'Login' ? "login" : "sign up"}to book appointment</p>
        {
          state === "Sign Up" ? <div className='w-full'>
            <p>Full name</p>
            <input className='border border-zinc-300 w-full p-2 mt-1 rounded-lg' onChange={(e) => setUserName(e.target.value)} value={userName} type="text" />
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
        <button className='bg-primary text-white w-full py-2 rounded-md text-base mt-2'>{state === 'Login' ? "Login" : "Create account"}</button>
        {state === "Sign Up" ? <p>Already have an account? <span onClick={() => setState('Loign')} className='cursor-pointer text-primary underline'>Login here</span></p>
          :
          <p>Create an new account? <span onClick={() => setState('Sign Up')} className='cursor-pointer text-primary underline'>Click here</span></p>
        }
      </div>
    </form>
  )
}

export default Login
