import { format } from 'date-fns';
import { UploadIcon } from 'lucide-react';
import React, { useState, useRef } from 'react'
import { DayPicker } from 'react-day-picker';
import Modal from "react-modal";
import { useDispatch, useSelector } from 'react-redux'
import { deleteAccount, updateProfile, uploadAvatar } from '../features/user/userSlice';
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';

Modal.setAppElement("#root");

const Profile = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null)
  const [showCalendar, setShowCalendar] = useState(false)
  const fileInputRef = useRef(null)
  const { user, loading } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    dob: ''
  })

  const handleChange = (e, isDate=false) => {
    if (isDate) {
      const formattedDate = format(e, 'yyyy-MM-dd')
      setSelectedDay(e)
      setFormData((prev) => ({
        ...prev,
        dob: formattedDate
      }))
      setShowCalendar(false)
    } else {
      const { name, value } = e.target
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(formData)
    const data = {}
    if (formData.name !== '') data.name = formData.name;
    if (formData.email !== '') data.email = formData.email;
    if (formData.password !== '') data.password = formData.password;
    if (formData.dob !== '') data.DOB = formData.dob

    dispatch(updateProfile(data))
  }

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      dispatch(uploadAvatar(formData))
        .unwrap()
        .then(() => {
          console.log('Avatar uploaded successfully');
        })
        .catch((error) => {
          console.error('Error uploading avatar:', error);
        });
    }
  };

  const handleDeleteAction = () => {
    dispatch(deleteAccount())
      .unwrap()
      .then(() => {
        navigate('/signin')
      })
      .catch(() => {
        toast.error('Something went wrong')
      })
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <div className='justify-start my-10 w-2/3'>
        <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold'>Profile</h1>
        <p className='text-[12px] md:text-[16px] text-gray-400 font-semibold my-1 text-justify'>Manage your account settings and preferences.</p>
      </div>
      <div className='flex flex-col bg-[#18181B] w-2/3 rounded-md p-6 sm:p-10 mb-10'>
        <h1 className='text-xl sm:text-2xl md:text-3xl font-bold'>Profile Picture</h1>
        <p className='text-[10px] md:text-[14px] text-gray-400 font-semibold my-1 text-justify'>Upload or update your profile picture</p>
        <div className='flex flex-col sm:flex-row space-x-5 mt-4'>
          {user?.avatar ? (
            <img 
              src={`data:image/jpeg;base64,${user.avatar}`}
              alt='Profile'
              className='w-32 h-32 rounded-full mb-4'
            />
            ) : (
              <div className="w-32 h-32 rounded-full bg-gray-800 flex items-center justify-center text-white text-6xl font-bold mb-4">
                {user?.name
                  ? user.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')
                      .toUpperCase()
                  : 'U'}
              </div>
          )}
          <button
            className='bg-zinc-700 hover:bg-zinc-600 text-white font-semibold rounded-md cursor-pointer h-fit py-2 px-3 my-auto'
            onClick={() => fileInputRef.current.click()}
          >
            <div className='flex items-center'>
              <UploadIcon className='w-4 h-4 mr-2' />
              <p>Upload Image</p>
            </div>
          </button>
          <input
            type='file'
            ref={fileInputRef}
            onChange={handleFileUpload}
            style={{ display: 'none' }}
          />
        </div>
      </div>
      <div className='flex flex-col bg-[#18181B] w-2/3 rounded-md p-6 sm:p-10 mb-10'>
        <h1 className='text-xl sm:text-2xl md:text-3xl font-bold'>General Information</h1>
        <p className='text-[10px] md:text-[14px] text-gray-400 font-semibold my-1 text-justify'>Update your information</p>
        <form onSubmit={handleSubmit}>
          <p className='w-1/3 mt-3'>Name</p>
          <input
            type='text'
            name='name'
            placeholder={user?.name || 'Enter your name'}
            value={formData.name}
            onChange={handleChange}
            className='border border-gray-300 rounded-md p-2 mb-3 w-full bg-black'
          />
          <p className='w-1/3 mt-3'>Email</p>
          <input
            type='text'
            name='email'
            placeholder={user?.email || 'Enter your email'}
            value={formData.email}
            onChange={handleChange}
            className='border border-gray-300 rounded-md p-2 mb-3 w-full bg-black'
          />
          <p className='w-1/3 mt-3'>Password</p>
          <input
            type='password'
            name='password'
            placeholder='Create a new password'
            value={formData.password}
            onChange={handleChange}
            className='border border-gray-300 rounded-md p-2 mb-3 w-full bg-black'
          />
          <p className='w-1/3 mt-3'>DOB</p>
          <input 
            type='text'
            name='dob'
            placeholder={user?.DOB || 'Select your dob'}
            value={formData.dob}
            onClick={() => setShowCalendar(!showCalendar)}
            readOnly
            className='border border-gray-300 rounded-md p-2 mb-3 w-full bg-black'
          />
          {showCalendar && (
            <div className="mb-4 border border-gray-300 rounded-md bg-black p-2 z-50 w-fit absolute">
              <DayPicker
                mode="single"
                selected={selectedDay}
                onSelect={(date) => handleChange(date, true)}
              />
            </div>
          )}
          <button type='submit' className='bg-zinc-700 hover:bg-zinc-600 text-white font-semibold py-2 px-4 rounded-md mt-4 cursor-pointer'>Save Changes</button>
        </form>
      </div>
      <div className='flex flex-col bg-[#18181B] w-2/3 rounded-md p-6 sm:p-10 mb-10 border-[0.5px] border-red-900/30'>
        <h3 className='text-red-500 text-xl sm:text-2xl md:text-3xl font-bold'>Danger Zone</h3>
        <p className='text-[10px] md:text-[14px] text-gray-400 font-semibold my-1 text-justify'>Irreversible and destructive actions</p>
        <hr className='border-1 text-zinc-800'/>
        <h4 className='text-lg sm:text-xl md:text-2xl font-bold my-2'>Delete Account</h4>
        <p className='text-[10px] md:text-[14px] text-gray-400 font-semibold my-1 text-justify'>Permanently delete your account and all associated data. Once you delete your account, there is no going back. Please be certain.</p>
        <button onClick={() => setModalIsOpen(true)} className='bg-red-800 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md mt-4 cursor-pointer'>Delete Account</button>

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          className="w-[90%] md:w-[500px] bg-[#18181B] bg-opacity-50 p-6 rounded-lg shadow-lg mx-auto mt-20 outline-none"
          overlayClassName="fixed inset-0 bg-black bg-opacity-20 flex justify-center items-start z-50"
        >
          <h2 className='text-red-500 text-xl sm:text-2xl md:text-3xl font-bold'>Delete Account</h2>
          <p className="mb-4 text-gray-200">This action is Irreversible. Are you sure...</p>
          <button
            onClick={handleDeleteAction}
            className="bg-red-800 hover:bg-red-500 text-white px-4 py-2 rounded mr-2 cursor-pointer"
          >
            Delete
          </button>
          <button
            onClick={() => setModalIsOpen(false)}
            className="bg-black text-white px-4 py-2 rounded cursor-pointer"
          >
            Cancel
          </button>
        </Modal>
      </div>
    </div>
  )
}

export default Profile