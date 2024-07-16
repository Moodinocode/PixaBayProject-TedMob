import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'

const SignupPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('');
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/signup', {email,password});
      console.log('Signup response:', response.data);

      await navigate('/');
    } catch (err) {
      setError(err.response.data.message)
      console.log('error:',err)
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
              placeholder='Password'
              onChange={(e)=>{
                setPassword(e.target.value)                
                setError('');
              }}
            />
          </div>
          <div>
            <input 
              type="text" 
              className='bg-gray-200 m-4 p-4' 
              placeholder='Confirm Passowrd'
              onChange={(e)=>{
                setConfirmPassword(e.target.value)
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
              <div className='text-sm mb-2'>
              <Link className='text-blue-500 hover:text-blue-700 underline' to="/log-in">Log in</Link>
            </div>

          </form>
      </div>
    </div>
  )
}

export default SignupPage