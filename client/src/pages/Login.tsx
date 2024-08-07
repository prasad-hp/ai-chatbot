import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import '@fontsource/roboto/500.css';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import { backendUrl } from '../../config';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [statusMessage, setStatusMessage] = useState("")
  const navigate = useNavigate()

  async function login(event:any) {
  console.log(`${backendUrl}/user/signup`)
  event.preventDefault()
    try {
        setStatusMessage("")
        setLoading(true)
        const response = await axios({
          method:"post",
          url:`${backendUrl}/user/login`,
          data:{
            email: email,
            password: password
          }
        })
        console.log(response.data.message)
        setStatusMessage(response.data.message)
        navigate("/chat")
    } catch (error:any) {
      const errorMessage = error.response?.data?.message ?? 'An error occurred. Please try again later.';
      const detailedMessage = error.response?.data?.message?.issues?.[0]?.message;
      setStatusMessage(detailedMessage || errorMessage);
    } finally {
        setLoading(false)
    }
  }

  return (
    <div>
      <Navbar />
      <div className='w-screen h-screen flex items-center justify-center'>
          <form onSubmit={login} className='p-3 py-5 flex flex-col w-1/4 space-y-3 text-center bg-gray-300 rounded-lg border-gray-400 border-2 shadow-lg'>
              <Typography variant="h3" gutterBottom>
                  Login
              </Typography>
              <TextField id="outlined-basic" label="Email" type='email' value={email} onChange={(e)=>setEmail(e.target.value)} variant="outlined" className='bg-white rounded-md'/>
              <TextField id="outlined-basic" label="Password" type='password' value={password} onChange={(e)=>setPassword(e.target.value)} variant="outlined" className='bg-white rounded-md'/>
                <p>{statusMessage}</p>
              <Button variant="outlined" type='submit' className='bg-blue-100 h-12'>
              {loading ? 'Logging in...' : "Log in"}
              </Button>
          </form>
      </div>
    </div>
  )
}

export default Login;