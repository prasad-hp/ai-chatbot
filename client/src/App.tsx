import Login from './pages/Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import Landing from './pages/Landing'
import Chat from './pages/Chat'
import Guestlogin from './pages/Guestlogin'

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />}/>
        <Route path='/signup' element={<Signup />}/>
        <Route path='/guest' element={<Guestlogin />}/>
        <Route path='/' element={<Landing />}/>
        <Route path='/chat' element={<Chat />}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
