import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { IconButton, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import Navbar from '../components/Navbar';
import SentMessage from '../components/SentMessage';
import ReceivedMessage from '../components/ReceivedMessage';
// import NewReceivedMessage from '../components/NewReceivedMessage';
import { backendUrl } from '../../config';

function Chat() {
  const [statusMessage, setStatusMessage] = useState("");
  const [chats, setChats] = useState<any[]>([]);
  const [message, setMessage] = useState("");
  const [newResponse, setNewResponse] = useState<string | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  async function sendMessage(event: React.FormEvent) {
    event.preventDefault();
    setNewResponse(null);
    try {
      setStatusMessage("Loading Please Wait");
      const response = await axios.post(`${backendUrl}/chat/send`, {
        userId: "66b2341f3c3bcce51051f8d5",
        message: message
      });
      setMessage("");
      setNewResponse(response.data.response);
      setChats(prevChats => [...prevChats, { request: message, response: response.data.response }]);
      setStatusMessage("");
    } catch (error: any) {
      const errorMessage = error.response?.data?.message ?? 'An error occurred. Please try again later.';
      const detailedMessage = error.response?.data?.message?.issues?.[0]?.message;
      setStatusMessage(detailedMessage || errorMessage);
    }
  }

  async function getChat() {
    try {
      const response = await axios.get(`${backendUrl}/chat/receive`, {
        params: {
          userId: "66b2341f3c3bcce51051f8d5"
        }
      });
      setChats(response.data);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message ?? 'An error occurred. Please try again later.';
      const detailedMessage = error.response?.data?.message?.issues?.[0]?.message;
      setStatusMessage(detailedMessage || errorMessage === "User Not found" ? "Welcome, Please start your conversation..." : errorMessage);
    }
  }

  useEffect(() => {
    getChat();
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chats, newResponse]);

  const chatList = chats.map((chat, index) => (
    <div key={index} className='w-full flex flex-col transform duration-100'>
      <SentMessage sentChat={chat.request} />
      <ReceivedMessage receivedChat={chat.response} />
    </div>
  ));

  return (
    <div className='w-full h-screen'>
      <Navbar />
      <div ref={chatContainerRef} className='flex flex-col items-center justify-center h-[85%]'>
        <div className='w-9/12 relative overflow-y-scroll no-scrollbar top-4 mt-5'>
          {chatList}
          {/* {newResponse && (
            <div className='w-full flex flex-col transform duration-100'>
              <NewReceivedMessage receivedChat={newResponse} />
            </div>
          )} */}
        </div>
        <p>{statusMessage}</p>
        <div className='fixed bottom-2 w-full flex justify-center bg-white'>
          <form className='w-9/12 flex space-x-3' onSubmit={sendMessage}>
            <TextField fullWidth type='text' label="Message GPT" id="fullWidth" value={message} onChange={(e) => setMessage(e.target.value)} />
            <IconButton aria-label="send" type='submit'>
              <SendIcon />
            </IconButton>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Chat;
