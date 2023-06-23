import { ChangeEvent, FormEvent, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import { newMessage } from "../../../../api/api";
import { getJWT } from "../../../../common/auth-cookie";
import { useChat } from "../../../../context/useChat";

export default function InputMessage() {

  const { otherUser } = useChat();
  const [message, setMessage] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setMessage(e.target.value);
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const newMess = {
        receivingUser: otherUser?._id,
        message
      }
      const { data } = await newMessage(newMess, getJWT());
      console.log(data);
  }

  return (
    <Box sx={{width:'100%'}}>
      <form onSubmit={handleSubmit}>
        <FormControl variant="standard">
          <Input type="text" name="message" placeholder="Type a message here" onChange={handleChange}/>
        </FormControl>

        <FormControl variant="standard">
          <Button type="submit" variant="contained">Send</Button>
        </FormControl>
      </form>
    </Box>
  )
}
