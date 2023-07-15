import { FormEvent, useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import SendIcon from '@mui/icons-material/Send';
import { newMessage } from "../../../../../api/api";
import { getJWT } from "../../../../../common/auth-cookie";
import { useChat } from "../../../../../context/useChat";
import { emitFromClient } from "../../../../../websockets/socket";
import TextField from "@mui/material/TextField";
import grey from '@mui/material/colors/grey';
import IconButton from "@mui/material/IconButton";

export default function InputMessage() {

  const { otherUser } = useChat();
  const [message, setMessage] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const newMess = {
        receivingUser: otherUser._id,
        message
      }
      const { data } = await newMessage(newMess, getJWT());
      if(data){
        setMessage('');
        emitFromClient(data);
      }
}

  return (
    <Box 
    component={'form'}
    onSubmit={handleSubmit}
    sx={{ 
      paddingX:3,
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      borderTop:2,
      borderColor:'divider',
    }}>
      <TextField
        inputRef={inputRef}
        InputProps={{ 
          disableUnderline: true,
          endAdornment: (
            <IconButton 
              type="submit" 
              color="primary"
              disabled={message === ''}
            >
              <SendIcon />
            </IconButton>
          ),
        }}
        sx={{ 
          borderRadius: 2,
          backgroundColor: grey[300],
          paddingY:'4px',
          paddingX: 2
        }}
        fullWidth
        variant="standard"
        type="text" 
        name="message" 
        placeholder="Send a message"
        value={message} 
        onChange={ (e) => setMessage(e.target.value)}
      />
    </Box>
  )
}
