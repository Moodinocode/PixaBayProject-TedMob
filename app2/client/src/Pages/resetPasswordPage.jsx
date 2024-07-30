import React from 'react'

const resetPasswordPage = () =>  {
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassowrd, setConfirmNewPassowrd] = useState('')
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const token = queryParams.get('token');


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (newPassword===confirmNewPassowrd){
        const password = newPassword
        const response = await axios.post('http://localhost:5000/auth/resetPassword', {password,token});
        console.log(response.data)
        navigate('/');
      } else {
        setError('Password does not match')
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
              placeholder='Password'
              onChange={(e)=>{
                setNewPassword(e.target.value)
                setError('');
              }}
            />
          </div>
          <div>
            <input 
              type="text" 
              className='bg-gray-200 m-4 p-4' 
              placeholder='Confirm Password'
              onChange={(e)=>{
                setConfirmNewPassowrd(e.target.value)                
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
            </div> 
          </form>
      </div>
    </div>
  )
}

export default resetPasswordPage