import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { IconButton, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import Navbar from '../components/Navbar';
import SentMessage from '../components/SentMessage';
import ReceivedMessage from '../components/ReceivedMessage';
import { backendUrl } from '../../config';

interface Chat {
  request: string;
  response: string;
}

function Chat() {
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [chats, setChats] = useState<Chat[]>([]);
  const [message, setMessage] = useState<string>("");
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [isLogged, setIslogged] = useState<boolean>(false);

  async function sendMessage(event: React.FormEvent) {
    event.preventDefault();
    setStatusMessage("Loading Please Wait");
    try {
      const response = await axios({
        method: "post",
        url: `${backendUrl}/chat/send`,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        data: { message },
      });

      const newChat = { request: message, response: response.data.response };
      setChats((prevChats) => [...prevChats, newChat]);
      setMessage("");
      setStatusMessage("");
    } catch (error: any) {
      const errorMessage = error.response?.data?.message ?? 'An error occurred. Please try again later.';
      const detailedMessage = error.response?.data?.message?.issues?.[0]?.message;
      setStatusMessage(detailedMessage || errorMessage);
    }
  }

  async function getChat() {
    try {
      const response = await axios({
        method: "get",
        url: `${backendUrl}/chat/receive`,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      setChats(response.data);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message ?? 'An error occurred. Please try again later.';
      const detailedMessage = error.response?.data?.message?.issues?.[0]?.message;
      setStatusMessage(detailedMessage || (errorMessage === "User Not found" ? "Welcome, Please start your conversation..." : errorMessage));
    }
  }

  useEffect(() => {
    getChat();
    if (localStorage.getItem("token")) {
      setIslogged(true);
    }
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chats]);

  const chatList = chats.map((chat, index) => (
    <div key={index} className='w-full flex flex-col transform duration-100'>
      <SentMessage sentChat={chat.request} />
      <ReceivedMessage receivedChat={chat.response} />
    </div>
  ));

  return (
    <div className='w-full h-screen'>
      <Navbar loggedState={isLogged} />
      <div className='flex flex-col items-center justify-center h-[85%]'>
        <div ref={chatContainerRef} className='w-9/12 relative overflow-y-scroll no-scrollbar top-4 mt-5'>
          {chatList}
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
