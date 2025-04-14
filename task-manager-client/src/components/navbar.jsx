import React from 'react'

const Navbar = () => {
  return (
    <div className='flex flex-row justify-between border-b-1 rounded-b-lg px-5 py-1 sm:py-3 fixed top-0 left-0 right-0 shadow-md bg-black'>
      <h1 className='text-sm sm:text-2xl font-semibold sm:font-bold text-center'>Task Manager</h1>
      <div className='flex space-x-4'>
        <button>
          <a href="/login" className='text-white font-medium py-2 px-4 rounded'>Login</a>
        </button>
        <button className='hidden sm:block'>
          <a href="/signup" className='text-black font-medium py-2 px-4 bg-white rounded'>
            Sign Up
          </a>
        </button>
      </div>
    </div>
  )
} 

export default Navbar