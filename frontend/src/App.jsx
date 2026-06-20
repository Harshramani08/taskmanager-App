import React from 'react'
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import NotFound from './pages/NotFound'
import TaskForm from './pages/TaskForm'
import Navbar from './components/Navbar'
import ProtectRoute from './components/ProtectRoute'
import AuthProvider from './context/AuthContext'

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route element={<ProtectRoute />}>
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/task-form' element={<TaskForm />} />
          </Route>
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Router>

    </AuthProvider>
  )
}

export default App