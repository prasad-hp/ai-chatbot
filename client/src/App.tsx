import { useState } from 'react'
import Login from './pages/Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import Landing from './pages/Landing'

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />}/>
        <Route path='/signup' element={<Signup />}/>
        <Route path='/' element={<Landing />}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
