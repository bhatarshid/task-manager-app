import React, { useState } from 'react'
import { Square, Edit, CheckSquare, Trash2 } from 'lucide-react'
import { deleteTask, editTask, getTasks } from '../features/task/taskSlice'
import EditTaskModal from './EditTaskModal'

const TaskCard = ({ task, dispatch }) => {
  const { _id, title, description, completed, priority } = task
  const [editModalOpen, setEditModalOpen] = useState(false)

  const priorityStyles = {
    high: 'text-red-400 bg-[#371517]',
    medium: 'text-yellow-400 bg-[#3a372a]',
    low: 'text-green-400 bg-[#3e584b]',
  }

  const handleDelete = async (id) => {
    await dispatch(deleteTask(id))
          .unwrap()
          .then(() => {
            dispatch(getTasks())
          })
  }

  const handleTaskStatus = async (status) => {
    console.log(status)
    const data = {
      id: task?._id,
      title,
      description,
      priority,
      completed: status
    }
    await dispatch(editTask(data))
      .unwrap()
      .then(() => {
        dispatch(getTasks())
      })
  }

  return (
    <div className={`p-5 rounded-md border-[1px] border-white w-full ${completed ? 'bg-[#0C0C0E]' : 'bg-black'}`}>
      <div className="flex mb-4">
        {completed ? (
          <button onClick={() => handleTaskStatus(false)} className='cursor-pointer'>
            <CheckSquare className="stroke-[1px] my-auto" />
          </button>
        ) : (
          <button onClick={() => handleTaskStatus(true)} className='cursor-pointer'>
            <Square className="stroke-[1px] my-auto" />
          </button>
        )}
        <div className="ml-3">
          <h1 className={`text-lg font-semibold ${completed ? 'line-through text-gray-500' : ''}`}>{title}</h1>
          <p title={description} className={`text-sm ${completed ? 'text-gray-700' : 'text-gray-400'} line-clamp-1`}>{description}</p>
        </div>
      </div>
      <div className="flex flex-row items-center justify-between">
        <p className={`text-sm py-0.5 px-2 rounded-xl ${priorityStyles[priority]}`}>
          {priority.charAt(0).toUpperCase() + priority.slice(1)} Priority
        </p>
        <div className="flex flex-row items-center space-x-5">
          <button onClick={() => setEditModalOpen(true)} className="border-[1px] border-gray-800 rounded-md p-2 cursor-pointer hover:bg-gray-900">
            <Edit className="stroke-1 h-4 w-4" />
          </button>
          {editModalOpen && (
            <EditTaskModal task={task} editModalOpen={editModalOpen} setEditModalOpen={setEditModalOpen} dispatch={dispatch} />
          )}
          <button onClick={() => handleDelete(_id)} className="border-[1px] border-gray-800 rounded-md p-2 cursor-pointer hover:bg-gray-900">
            <Trash2 className="stroke-1 h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default TaskCard