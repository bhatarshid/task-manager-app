import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <div>
      <footer className="bg-gray-900 text-gray-300 text-sm sm:text-[15px] py-4 text-center bottom-0 w-full">
        <p>&copy; 2023 Task Manager. All rights reserved.</p>
        <p>Created by <a href="https://github.com/bhatarshid" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 underline">
            Arshid Bhat
          </a>
        </p>
      </footer>
    </div>
  )
}

export default Footer