import React from 'react'
import { Square, Edit, LucideDelete, CheckSquare } from 'lucide-react'

const TaskCard = ({ task }) => {
  const { title, description, completed, priority } = task

  const priorityStyles = {
    high: 'text-red-400 bg-[#371517]',
    medium: 'text-yellow-400 bg-[#3a372a]',
    low: 'text-green-400 bg-[#3e584b]',
  }

  return (
    <div className={`p-5 rounded-md border-[1px] border-white w-full ${completed ? 'bg-[#0C0C0E]' : 'bg-black'}`}>
      <div className="flex mb-4">
        {completed ? (
          <CheckSquare className="stroke-[1px] my-auto" />
        ) : (
          <Square className="stroke-[1px] my-auto cursor-pointer" />
        )}
        <div className="ml-3">
          <h1 className={`text-lg font-semibold ${completed ? 'line-through text-gray-500' : ''}`}>{title}</h1>
          <p className={`text-sm ${completed ? 'text-gray-700' : 'text-gray-400'}`}>{description}</p>
        </div>
      </div>
      <div className="flex flex-row items-center justify-between">
        <p className={`text-sm py-0.5 px-2 rounded-xl ${priorityStyles[priority]}`}>
          {priority.charAt(0).toUpperCase() + priority.slice(1)} Priority
        </p>
        <div className="flex flex-row items-center space-x-5">
          <button className="border-[1px] border-gray-800 rounded-md p-2 cursor-pointer hover:bg-gray-900">
            <Edit className="stroke-1 h-4 w-4" />
          </button>
          <button className="border-[1px] border-gray-800 rounded-md p-2 cursor-pointer hover:bg-gray-900">
            <LucideDelete className="stroke-1 h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default TaskCard