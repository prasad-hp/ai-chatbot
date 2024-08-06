import React from 'react'
import { TextField, Button, Typography } from '@mui/material';
import '@fontsource/roboto/500.css';
import Navbar from '../components/Navbar';

function Signup() {
  return (
    <div>
      <Navbar />
      <div className='w-screen h-screen flex items-center justify-center'>
          <form action="login" className='p-3 pt-3 flex flex-col w-1/4 space-y-3 text-center bg-gray-300 rounded-lg border-gray-400 border-2 shadow-lg'>
              <Typography variant="h3" gutterBottom>
                  Signup
              </Typography>
              <TextField id="outlined-basic" label="First Name" variant="outlined" className='bg-white rounded-md'/>
              <TextField id="outlined-basic" label="Last Name" variant="outlined" className='bg-white rounded-md'/>
              <TextField id="outlined-basic" label="Email" type='email' variant="outlined" className='bg-white rounded-md'/>
              <TextField id="outlined-basic" label="Password" type='password' variant="outlined" className='bg-white rounded-md'/>
              <TextField id="outlined-basic" label="Confirm Password" type='password' variant="outlined" className='bg-white rounded-md'/>
              <Button variant="outlined" className='bg-blue-100 h-12'>Create Account</Button>
          </form>
      </div>
    </div>
  )
}

export default Signup