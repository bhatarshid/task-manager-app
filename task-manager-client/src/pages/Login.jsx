import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formData)
    navigate('/dashboard')
  }

  return (
    <div className='flex items-center justify-center min-h-screen w-full pt-6 pb-12'>
      <div className='flex flex-col items-center justify-center w-full'>
        <h1 className='text-xl font-bold my-1'>Task Manager</h1>
        <h1 className='text-2xl font-bold my-1'>Welcome back</h1>
        <p className='text-sm text-gray-400 font-medium my-1'>Enter your credentials to sign in to your account</p>
        <div className='w-1/3 mt-3'>
          <form onSubmit={handleSubmit} >
            <p className='pb-3 font-semibold'>Email</p>
            <input 
              type='text'
              name='email'
              placeholder='Enter your email'
              value={formData.email}
              onChange={handleChange}
              className='border border-gray-300 rounded-md p-2 mb-3 w-full bg-black'
            />
            <p className='pb-3 font-semibold'>Password</p>
            <input 
              type='password'
              name='password'
              placeholder='Enter your password'
              value={formData.password}
              onChange={handleChange}
              className='border border-gray-300 rounded-md p-2 mb-3 w-full bg-black'
            />
            <button className='w-full mt-4'>
              <p className='text-black px-2 py-2 bg-white rounded-md'>Sign in</p>
            </button>
          </form>
          <p className='text-sm text-gray-200 font-normal my-3'>Don't have an account? <Link to='/signup' className='text-blue-600 cursor-pointer'>Sign up</Link></p>
        </div>
      </div>
    </div>
  )
}

export default Login