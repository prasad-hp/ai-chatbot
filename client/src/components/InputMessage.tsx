import { TextField } from '@mui/material'
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';

function InputMessage() {
  return (
    <div className='w-10/12 flex space-x-3'>
        <TextField fullWidth label="Message GPT" id="fullWidth" />
        <IconButton aria-label="delete">
            <SendIcon />
        </IconButton>
    </div>
  )
}

export default InputMessage