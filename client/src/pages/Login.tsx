import React from 'react';
import { TextField, Button, Typography } from '@mui/material';
import '@fontsource/roboto/500.css';
import Navbar from '../components/Navbar';

function Login() {
  return (
    <div>
      <Navbar />
      <div className='w-screen h-screen flex items-center justify-center'>
          <form action="login" className='p-3 py-5 flex flex-col w-1/4 space-y-3 text-center bg-gray-300 rounded-lg border-gray-400 border-2 shadow-lg'>
              <Typography variant="h3" gutterBottom>
                  Login
              </Typography>
              <TextField id="outlined-basic" label="Email" variant="outlined" className='bg-white rounded-md'/>
              <TextField id="outlined-basic" label="Password" variant="outlined" className='bg-white rounded-md'/>
              <Button variant="outlined" className='bg-blue-100 h-12'>Login</Button>
          </form>
      </div>
    </div>
  )
}

export default Login;