import React from 'react'
import Navbar from '../components/Navbar'
import InputMessage from '../components/InputMessage'
import SentMessage from '../components/SentMessage'

function Chat() {
  return (
    <div className='w-full'>
        <Navbar />
        <div className='flex flex-col items-center justify-center'>
            <SentMessage />
                <div className='fixed bottom-5 w-full flex justify-center'>
                    <InputMessage />
                </div>
        </div>
    </div>
  )
}

export default Chat