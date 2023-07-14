import Box from "@mui/material/Box";
import grey from "@mui/material/colors/grey";
import { useChat } from "../../../../../../context/useChat";
import { Message } from "../../../../../../interfaces/context.interfaces";

interface Props {
    message: Message;
}

export default function MessageItem({message}:Props) {

    const { user } = useChat(); 

    const getUserSide = (id: string) => {
        if(user._id === id) return true;
        return false;
    }

  return (
    <Box 
    sx={{
        display:'flex',
        justifyContent: 
            getUserSide(message.sendingUser) ?
            'flex-end' :
            'flex-start',
        marginY: 3,
    }}>
        <Box
            sx={{
                backgroundColor: grey[300],
                paddingY:2,
                paddingX:3,
                boxShadow:1,
                borderRadius: 
                    getUserSide(message.sendingUser) ? 
                        '20px 20px 0 20px' :
                        '20px 20px 20px 0px',
                maxWidth:'65%',
            }}
        >
            {message.message}
        </Box>
    </Box>
  )
}
