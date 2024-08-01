import React,{ useState } from 'react'
import axios from 'axios'
import { Link,useNavigate } from 'react-router-dom'

const ResetPasswordMail = () => {
  const [email, setEmail] = useState('')
  const navigate = useNavigate();
  const [error, setError] = useState('');



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/auth/resetPasswordMail', {email});
      console.log(response.data)
      const token = response.data.token
      console.log('retrieved token',token)
      localStorage.setItem("token",token)
    } catch (err) {
      setError(err.response.data.message)
      console.log('error:',error)
    }
  }
  return (
    <div className='flex justify-center items-center h-screen bg-green-100'>
      <div className='w-56 h-auto bg-white rounded-lg shadow-2xl border border-gray-300 relative overflow-hidden '>
        <form className='text-center p-4' onSubmit={handleSubmit}>
          <div>
            <input
              type="text" 
              className='bg-gray-200 p-2' 
              placeholder='Email'
              onChange={(e)=>{
                setEmail(e.target.value)
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
              <Link className='text-blue-500 hover:text-blue-700 underline' to="/">Log in</Link>
            </div> 
          </form>
      </div>
    </div>
  )
}


export default ResetPasswordMail