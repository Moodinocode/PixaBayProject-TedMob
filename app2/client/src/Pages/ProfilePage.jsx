import React from 'react'
import { useNavigate } from 'react-router-dom';


const ProfilePage = () => {
  const navigate = useNavigate();

  const handleLogout = ()=>{
    localStorage.removeItem('token');
    navigate('/');
  }
  return (
    <>
    <div>ProfilePage</div>
      <button onClick={handleLogout}>
        Logout
      </button>
    </>
  )
}

export default ProfilePage