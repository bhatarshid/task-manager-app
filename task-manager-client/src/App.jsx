import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/login"
import Signup from "./pages/signup"
import Dashboard from "./pages/Dashboard"
import Profile from "./pages/Profile"
import NotFound from "./pages/NotFound"

function App() {
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
