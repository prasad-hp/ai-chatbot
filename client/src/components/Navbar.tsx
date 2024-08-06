import { useState } from 'react'
import { Button } from '@mui/material';
function Navbar() {
    const [logged, setLogged] = useState(false)

  return (
    <div className='flex justify-between w-full p-3'>
        <div className='flex items-center space-x-1'>
            <img src="../openai.svg" alt="Logo OpenAi" className='h-8'/>
            <p className='text-2xl font-sans font-semibold'>GPT</p>
        </div>
        <div>
            <div className= {`${ logged ? "hidden" : "inline-block"} `}>
                <div className='flex space-x-2'>
                    <Button variant="contained" color='success' onClick={()=>setLogged(!logged)}>Login</Button>
                    <Button variant="contained" color='secondary' onClick={()=>setLogged(!logged)}>Signup</Button>
                </div>
            </div>
            <div className={`${ logged ? "inline-block" : "hidden" }`}>
                <Button variant="contained"  onClick={()=>setLogged(!logged)}> Logout </Button>
            </div>
        </div>
    </div>
  )
}

export default Navbar