import React from 'react'

const Navbar = () => {
  return (
    <div className='flex flex-row justify-between border-b-1 rounded-b-lg px-5 py-3'>
      <h1 className='text-2xl font-bold text-center'>Task Manager</h1>
      <div>
        <button>
          <a href="/login" className='text-white font-medium py-2 px-4 rounded'>Login</a>
        </button>
        <button>
          <a href="/signup" className='text-black font-medium py-2 px-4 bg-white rounded'>
            Sign Up
          </a>
        </button>
      </div>
    </div>
  )
} 

export default Navbar