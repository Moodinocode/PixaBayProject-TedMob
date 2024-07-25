import React, { useState } from 'react'
import axios from 'axios'
import {Link,useNavigate} from 'react-router-dom'


const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate();
  const [error, setError] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/auth/login', {email,password});
      console.log('login response:', response.data);


      const token= localStorage.getItem(token)

      const url = `/home?token=${token}`
      
      if (url) {
        navigate(url);
      } else {
        console.error('URL is invalid:', url);
      }
    } catch (err) {
      setError(err.response.data.message)
      console.log('error:',error)
    }
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
              onChange={(e)=>{
                setEmail(e.target.value)
                setError('');
              }}
            />
          </div>
          <div>
            <input 
              type="text" 
              className='bg-gray-200 m-4 p-4' 
              placeholder='Passowrd'
              onChange={(e)=>{
                setPassword(e.target.value)                
                setError('');
              }}
            />
          </div>
          <p className='errortxt text-red-600'>{error}</p>
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