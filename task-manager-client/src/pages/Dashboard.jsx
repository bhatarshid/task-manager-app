import React, { useEffect } from 'react'
import { Plus } from 'lucide-react'
import TaskCard from '../components/TaskCard'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-hot-toast'
import { getTasks } from '../features/task/taskSlice'

const Dashboard = () => {
  const dispatch = useDispatch();
  const { tasks } = useSelector((state) => state.task)
  
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        await dispatch(getTasks())
      } catch (error) {
        console.log(error)
        toast.error('Failed to fetch tasks');
      }
    };
    fetchTasks();
  }, [dispatch]);
  
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
          <p className='hidden sm:flex font-normal ml-2'>Add Task</p>
        </button>
      </div>
      <div className='grid sm:grid-cols-2 gap-4'>
        {tasks?.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  )
}

export default Dashboard