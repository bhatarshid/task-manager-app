import React, { useState } from 'react'
import Modal from "react-modal";
import { X } from 'lucide-react'

const AddTaskModal = ({ modalIsOpen, setModalIsOpen }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleForm = () => {
    
  }

  return (
    <div>
      <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          className="bg-[#18181B] w-1/2 flex flex-col justify-center m-auto rounded-2xl border-[1px]"
          overlayClassName="fixed inset-0 flex bg-white/20"
        >
          <div className='flex flex-row items-center justify-between w-full px-10 pt-3 pb-2'>
            <h2 className='font-bold'>Add New Task</h2>
            <button
              onClick={() => setModalIsOpen(false)}
              className='p-2 hover:bg-zinc-600 cursor-pointer rounded-xl'
            >
              <X />
            </button>
          </div>
          <hr className='pt-3 mx-9'/>
          <div className='pb-3 px-10 w-full items-center'>
            <form onSubmit={handleForm}>
              <p className='mt-2 mb-0.5'>Title</p>
              <input
                type='text'
                name='title'
                placeholder='Enter task title'
                value={formData.title}
                onChange={handleChange}
                className='border border-gray-300 rounded-md p-2 w-full bg-black'
              />
              <p className='mt-2 mb-0.5'>Description</p>
              <textarea
                name='description'
                placeholder='Enter task description'
                value={formData.description}
                onChange={handleChange}
                className='border border-gray-300 rounded-md p-2 w-full h-26 bg-black resize-none'
              />
              <p className='mt-2 mb-0.5'>Priority</p>
              <input
                type='text'
                name='priority'
                placeholder='Enter task priority'
                value={formData.priority}
                onChange={handleChange}
                className='border border-gray-300 rounded-md p-2 w-full bg-black'
              />
              <button type='submit' className='w-full bg-zinc-700 hover:bg-zinc-600 text-white font-semibold py-2 px-4 rounded-md my-4 cursor-pointer'>Add Task</button>
            </form>
          </div>
        </Modal>
    </div>
  )
}

export default AddTaskModal