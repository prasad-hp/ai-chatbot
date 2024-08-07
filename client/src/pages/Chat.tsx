import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import InputMessage from '../components/InputMessage'
import SentMessage from '../components/SentMessage'
import ReceivedMessage from '../components/ReceivedMessage'
import axios from 'axios'
import { backendUrl } from '../../config'
import { IconButton, TextField } from '@mui/material'
import SendIcon from '@mui/icons-material/Send';

function Chat() {
  const [statusMessage, setStatusMessage] = useState("")
  const [chats, setChats] = useState([])

  async function sendMessage() {
    try {
      setStatusMessage("Loading Please Wait")
      await axios({
        method:"post",
        url:`${backendUrl}/chat/send`,
        data:{
          userId:"",
          message:""
        }
      })
    } catch (error:any){
      const errorMessage = error.response?.data?.message ?? 'An error occurred. Please try again later.';
      const detailedMessage = error.response?.data?.message?.issues?.[0]?.message;
      setStatusMessage(detailedMessage || errorMessage);
    }
  }
  async function getChat() {
    try {
      const response = await axios({
        method:"get",
        url:`${backendUrl}/chat/receive`,
        data:{
          userId:""
        }
      })
      setChats(response.data.message)
    } catch (error:any){
      const errorMessage = error.response?.data?.message ?? 'An error occurred. Please try again later.';
      const detailedMessage = error.response?.data?.message?.issues?.[0]?.message;
      setStatusMessage(detailedMessage || errorMessage);
    }
  }
  useEffect(()=>{
    getChat()
  }, [])
  return (
    <div className='w-full'>
        <Navbar />
        <div className='flex flex-col items-center justify-center'>
          <div>
            <SentMessage />
            <ReceivedMessage />
          </div>
          <p>{statusMessage}</p>
          <div className='fixed bottom-5 w-full flex justify-center'>
            <div className='w-10/12 flex space-x-3'>
              <TextField fullWidth label="Message GPT" id="fullWidth" />
              <IconButton aria-label="delete" onClick={()=>sendMessage()}>
                  <SendIcon />
              </IconButton>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Chat