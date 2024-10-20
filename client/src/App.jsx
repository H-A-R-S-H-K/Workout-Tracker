import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import './App.css'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Signup from './pages/Signup'

function App() {
  const [user, setUser] = useState(null)

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home user={user}/>}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='signup' element={<Signup />}></Route>
          <Route path='/dashboard' element={<Dashboard />}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
