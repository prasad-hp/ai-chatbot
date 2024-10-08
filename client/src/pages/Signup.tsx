import { useEffect, useState } from 'react'
import { TextField, Button, Typography } from '@mui/material';
import '@fontsource/roboto/500.css';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { backendUrl } from "../../config"
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [statusMessage, setStatusMessage] = useState("")
  const navigate = useNavigate()
  useEffect(()=>{
    setLoading(false)
  }, [email, password, statusMessage])
  async function signup(event:any) {
    console.log(`${backendUrl}/user/signup`)
    event.preventDefault()
    if(password !== confirmPassword){
      setStatusMessage("Password Does not Match")
    }else{
      try {
          setStatusMessage("")
          setLoading(true)
          const response = await axios({
            method:"post",
            url:`${backendUrl}/user/signup`,
            data:{
              firstName: firstName,
              lastName: lastName,
              email: email,
              password: password
            }
          })
          localStorage.setItem("token", response.data.token)
          setStatusMessage(response.data.message)
          navigate("/chat")
      } catch (error:any) {
        const errorMessage = error.response?.data?.message ?? 'An error occurred. Please try again later.';
        const detailedMessage = error.response?.data?.message?.issues?.[0]?.message;
        setStatusMessage(detailedMessage || errorMessage);
      }
    }
  }
  return (
    <div>
      <Navbar />
      <div className='w-screen h-screen flex items-center justify-center'>
          <form onSubmit={signup} className='p-3 pt-3 flex flex-col md:w-1/4 w-[90%] sm:w-[85%] min-w-96 max-w-lg space-y-3 text-center bg-gray-300 rounded-lg border-gray-400 border-2 shadow-lg'>
              <Typography variant="h3" gutterBottom>
                  Signup
              </Typography>
              <TextField id="outlined-basic" label="First Name" type='text' value={firstName} onChange={(e)=>setFirstName(e.target.value)} variant="outlined" className='bg-white rounded-md'/>
              <TextField id="outlined-basic" label="Last Name" type='text' value={lastName} onChange={(e)=>setLastName(e.target.value)} variant="outlined" className='bg-white rounded-md'/>
              <TextField id="outlined-basic" label="Email" type='email' value={email} onChange={(e)=>setEmail(e.target.value)} variant="outlined" className='bg-white rounded-md'/>
              <TextField id="outlined-basic" label="Password" type='password' value={password} onChange={(e)=>setPassword(e.target.value)} variant="outlined" className='bg-white rounded-md'/>
              <TextField id="outlined-basic" label="Confirm Password" type='password' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} variant="outlined" className='bg-white rounded-md'/>
                <p>{statusMessage}</p>
              <Button variant="outlined" type='submit' className='bg-blue-100 h-12' disabled={loading}>
                {loading ? 'Creating Account...' : 'Create Account'}
              </Button>
          </form>
      </div>
    </div>
  )
}

export default Signup