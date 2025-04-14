import React from 'react'
import { Plus, Square, Edit, LucideDelete } from 'lucide-react'
import TaskCard from '../components/TaskCard'

const Dashboard = () => {
  const tasks = [
    { id: 1, title: 'Task 1', description: 'Description for Task 1', completed: false, priority: 'high' },
    { id: 5, title: 'Task 4', description: 'Description for Task 4', completed: true, priority: 'low' },
    { id: 6, title: 'Task 4', description: 'Description for Task 4', completed: false, priority: 'medium' },
    { id: 2, title: 'Task 2', description: 'Description for Task 2', completed: true, priority: 'high' },
    { id: 3, title: 'Task 3', description: 'Description for Task 3', completed: false, priority: 'low' },
  ];

  const handleClick = () => {
    console.log('Add Task button clicked')
    // Add your logic to navigate to the Add Task page or open a modal here
  }
  return (
    <div className="flex flex-col min-h-screen w-full p-10 space-y-10">
      <div className='flex flex-row justify-between w-full'>
        <h1 className='text-3xl font-bold'>Tasks</h1>
        <button onClick={handleClick} className='text-xl bg-white text-black px-3 py-1 rounded-md cursor-pointer flex items-center justify-center h-10'>
          <Plus className='stroke-[1px]' />
          <p className='font-normal ml-2'>Add Task</p>
        </button>
      </div>
      <div className='grid sm:grid-cols-2 gap-4'>
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  )
}

export default Dashboard