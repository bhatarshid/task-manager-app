import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getProfile, logoutUser } from '../features/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.user)
  const navigate = useNavigate()
  const [loggedin, setLoggedin] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const result = await dispatch(getProfile()).unwrap();
        if (result) {
          setLoggedin(true);
        } else {
          navigate('/login');
          setLoggedin(false)
        }
      } catch (error) {
        console.log(error)
        navigate('/login');
        setLoggedin(false)
      }
    };

    if (['/dashboard', '/profile'].includes(window.location.pathname)) {
      fetchProfile();
    }
  }, [dispatch, navigate]);

  const handleLogout = async () => {
    await dispatch(logoutUser())
    navigate('/login')
    setLoggedin(false)
  }

  return (
    <div className='flex flex-row items-center justify-between border-b-1 rounded-b-lg px-5 py-1 sm:py-3 top-0 left-0 right-0 shadow-md bg-black'>
      <Link to={loggedin ? '/dashboard' : '/home'} className='text-sm sm:text-2xl font-semibold sm:font-bold text-center'>Task Manager</Link>
      {loggedin ? (
        <div>
          <button onClick={toggleDropdown} className="flex items-center space-x-4 cursor-pointer">
            {user?.avatar ? (
              <img
                src={`data:image/jpeg;base64,${user.avatar}`}
                alt="User Profile"
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full"
              />
            ) : (
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-800 flex items-center justify-center text-white font-bold">
                {user?.name
                  ? user.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')
                      .toUpperCase()
                  : 'U'}
              </div>
            )}
          </button>
          {isDropdownOpen && 
            <div className="absolute right-0 mt-2 w-48 bg-black rounded-lg shadow-lg py-2 border-[1px] border-white">
              <Link
                to="/profile"
                className="block px-4 py-2 text-sm hover:bg-[#0e0d0d] rounded transition duration-300"
              >
                Profile
              </Link>
              <hr className='mx-4 text-gray-400' />
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm hover:bg-[#0e0d0d] rounded transition duration-300 cursor-pointer"
              >
                Logout
              </button>
            </div>
          }
        </div>
      ) : (
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
      )}
    </div>
  )
} 

export default Navbar