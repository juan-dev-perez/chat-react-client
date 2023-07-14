import { useRef, useEffect } from 'react';
import Box from "@mui/material/Box";
import { useChat } from "../../../../../context/useChat";
import MessageItem from './MessageItem/MessageItem';

export default function MessagesContainer() {

    const { activeChat, chats } = useChat(); 
    const chat = chats.find(oneChat => oneChat._id === activeChat._id);
    const messageContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (messageContainerRef.current) {
          messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
        }
    });
    
    return (
        <Box ref={messageContainerRef} sx={{ overflowY: 'auto', paddingX: 5 }}>
            {   
                chat && chat.messages.map( message => ( <MessageItem message={message} key={message._id}/> ) )
            }
        </Box>
    )
}
