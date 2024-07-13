import React from 'react'
import { useState } from 'react'
import {Link} from 'react-router-dom'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();
    // check if user is in database based on current email and password
    // if yes the log in 
    // if not return error message with suggestion to create new user
  }


  return (
    <div className='flex justify-center items-center h-screen bg-green-100'>
      <div className='w-64 h-auto bg-white rounded-lg shadow-2xl border border-gray-300 relative overflow-hidden'>
        <form className='text-center' onSubmit={handleSubmit}>
          <div>
            <input
              type="text" 
              className='bg-gray-200 m-4 p-4' 
              placeholder='Email'
              onchange={(e)=>{setEmail(e.target.value)}}
            />
          </div>
          <div>
            <input 
              type="text" 
              className='bg-gray-200 m-4 p-4' 
              placeholder='Passowrd'
              onchange={(e)=>{setPassword(e.target.value)}}
            />
          </div>
          <div>
            <button 
              type="submit" 
              className=' border-solid border-1 border-black bg-blue-400 m-4 p-3 rounded-2xl'
              >submit</button>
            </div>
            <div className='text-sm'>
            <span>Dont have an account? </span>
            <Link className='text-blue-500 hover:text-blue-700 underline' to="/signup">sign Up</Link>
            </div> 
            <div  className='text-sm mb-2'>
            <Link className='text-blue-500 hover:text-blue-700 underline' to="/passwordRest">Forgot Password?</Link>
            </div>
          </form>
      </div>
    </div>
  )
}

export default LoginPage