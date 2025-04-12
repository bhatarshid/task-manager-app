import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen px-6">
      <div className="text-center">
        <h1 className="text-6xl font-bold">404</h1>
        <p className="text-2xl mt-4 text-gray-600">Oops! Page not found.</p>
        <p className="mt-2 text-gray-500">The page you’re looking for doesn’t exist.</p>
        <Link
          to="/"
          className="mt-6 inline-block px-8 py-3 bg-blue-600 text-white rounded-4xl hover:bg-blue-700 transition"
        >
          Go Home
        </Link>
      </div>
    </div>
  )
}

export default NotFound