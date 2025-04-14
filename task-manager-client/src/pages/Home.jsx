import React from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckCircle, Clock, ListTodo } from 'lucide-react' 

const Home = () => {
  const navigate = useNavigate()
  const handleGetStarted = () => {
    navigate('/signup')
  }
  const handleLogin = () => {
    navigate('/login')
  }
  return (
    <div className='flex flex-col items-center justify-center'>
      {/* Hero Section */}
      <div className='mt-10 flex flex-col md:flex-row items-center justify-between mx-10 min-h-screen py-10'>
        <div className='w-full sm:w-1/2'>
          <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold px-2 my-1'>Manage Your Tasks Efficiently.</h1>
          <h2 className='text-[14px] md:text-[18px] text-gray-400 font-semibold px-2 my-1 text-justify'>TaskManager helps you organize your work and life with a simple, intuitive interface.</h2>
          <div className='my-6 mx-2 flex flex-col sm:flex-row space-y-2 sm:space-y-0'>
            <button onClick={handleGetStarted} className='bg-white text-black py-2 px-6 rounded-md cursor-pointer'>
              Get Started
            </button>
            <button onClick={handleLogin} className='bg-black py-2 px-7 rounded-md sm:ml-2 cursor-pointer border-[1px] border-gray-700'>
              Login
            </button>
          </div>
        </div>
        <div className='bg-black border-[1px] border-gray-300 rounded-md w-full md:w-2/5 py-5'>
          <div className='flex flex-row my-3'>
            <CheckCircle className='text-green-500 my-auto mx-6'/>
            <div>
              <h3 className='font-semibold'>Complete Project Proposal</h3>
              <p className='text-sm font-normal text-gray-400'>High Priority</p>
            </div>
          </div>
          <div className='flex flex-row my-3'>
            <Clock className='text-amber-400 my-auto mx-6'/>
            <div>
              <h3 className='font-semibold'>Schedule team meeting</h3>
              <p className='text-sm font-normal text-gray-400'>Medium Priority</p>
            </div>
          </div>
          <div className='flex flex-row my-3'>
            <ListTodo className='text-blue-500 my-auto mx-6' />
            <div>
              <h3 className='font-semibold'>Research new technologies</h3>
              <p className='text-sm font-normal text-gray-400'>Low Priority</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className='bg-[#27272A] min-h-screen w-full flex flex-col items-center justify-center p-5'>
        <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold mb-1'>Features</h1>
        <h3 className='text-[14px] md:text-[18px] text-gray-400 font-semibold px-2 my-1 text-justify'>Everything you need to stay organized and productive</h3>
        <div className='flex flex-col md:flex-row justify-between text-justify'>
          <div className='flex flex-col items-center justify-center m-10'>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-black">
              <ListTodo className="h-6 w-6" />
            </div>
            <h1 className='text-xl font-bold'>Task Management</h1>
            <p className='text-sm text-gray-400 font-semibold'>Create, update, and organize your tasks with ease</p>
          </div>
          <div className='flex flex-col items-center justify-center m-10'>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-black">
              <Clock className="h-6 w-6" />
            </div>
            <h1 className='text-xl font-bold'>Priority Setting</h1>
            <p className='text-sm text-gray-400 font-semibold'>Set priorities to focus on what matters most</p>
          </div>
          <div className='flex flex-col items-center justify-center m-10'>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-black">
              <CheckCircle className="h-6 w-6" />
            </div>
            <h1 className='text-xl font-bold'>Progress Tracking</h1>
            <p className='text-sm text-gray-400 font-semibold'>Track your progress and celebrate your achievements

</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home