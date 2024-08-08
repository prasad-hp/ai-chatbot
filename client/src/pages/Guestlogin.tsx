import { TextField } from '@mui/material'
import { useState } from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import axios from 'axios'
import { backendUrl } from '../../config'

function Guestlogin() {
    const [firstName, setFirstName] = useState("")
    const [statusMessage, setStatusMessage] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    async function guestLogin(event:any) {
        event.preventDefault()
        try {
            setLoading(true)
            const response = await axios({
                method:"post",
                url:`${backendUrl}/user/guest`,
                data:{
                    name:firstName
                }
            })
            console.log(response.data.message)
            setStatusMessage(response.data.message)
            localStorage.setItem("token", response.data.token)
            navigate("/chat")
        } catch (error:any) {
            const errorMessage = error.response?.data?.message ?? 'An error occurred. Please try again later.';
            const detailedMessage = error.response?.data?.message?.issues?.[0]?.message;
            setStatusMessage(detailedMessage || errorMessage);
        }
    }
  return (
    <div className='h-screen w-screen'>
        <Navbar />
        <div className='flex flex-col items-center justify-center w-full h-full space-y-2'>
            <h2 className='text-gray-500 text-center text-4xl font-sans font-semibold'>Welcome to Chatbot</h2>
            <form action="" onSubmit={guestLogin} className='text-center'>
                <TextField id="outlined-basic" label="Enter Your Name" type='text' value={firstName} onChange={(e)=>setFirstName(e.target.value)} variant="outlined" className='bg-white rounded-md'/>
                <p>{statusMessage}</p>
                <Button variant="outlined" type='submit' className='bg-blue-100 h-12 my-2' disabled={loading}>
                    {loading ? 'Logging In...' : 'Login'}
                </Button>
            </form>
        </div>
    </div>
  )
}

export default Guestlogin