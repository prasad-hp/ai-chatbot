import { useEffect, useState } from 'react'
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Navbar(props:any) {
    const [logged, setLogged] = useState(false)
    const navigate = useNavigate();
    useEffect(()=>{
        setLogged(props.loggedState)
    },[props, logged])
    function logOut(){
        setLogged(false)
        localStorage.removeItem("token")
        navigate("/")
    }
  return (
    <div className='flex justify-between w-full p-3 fixed bg-white'>
        <div className='flex items-center space-x-1 hover:cursor-pointer' onClick={()=>navigate("/")}>
            <img src="../chatbot.svg" alt="Logo OpenAi" className='h-8'/>
            <p className='text-2xl font-sans font-semibold'>Ai Chatbot</p>
        </div>
        <div>
            <div className= {`${ logged ? "hidden" : "inline-block"} `}>
                <div className='flex space-x-2'>
                    <Button variant="contained" color='success' onClick={()=>navigate("/login")}>Login</Button>
                    <Button variant="contained" color='secondary' onClick={()=>navigate("/signup")}>Signup</Button>
                </div>
            </div>
            <div className={`${ logged ? "inline-block" : "hidden" }`}>
                <Button variant="contained" onClick={()=>logOut()}> Logout </Button>
            </div>
        </div>
    </div>
  )
}

export default Navbar