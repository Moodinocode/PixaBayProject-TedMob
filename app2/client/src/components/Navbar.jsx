import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {

  const NavDesign = "text-xl font-medium border-2 border-solid border-blue-800 p-2 rounded-3xl hover:bg-sky-700"
  const handleLogout = ()=>{
    localStorage.removeItem('token');
  }

  return (
    <nav className='bg-green-600 border-b border-indigo-500'>
      <div className='mx-auto max-w-5xl'>
        <div className='flex h-20 items-center justify-between'>
          <NavLink className={NavDesign} to='/home'>Home</NavLink>
          <NavLink className={NavDesign} to='/favorites'>Favorites</NavLink>
          <NavLink className={NavDesign} onClick={handleLogout} to='/'>logout</NavLink>
        </div>
      </div>
    </nav>
  )
}

export default Navbar