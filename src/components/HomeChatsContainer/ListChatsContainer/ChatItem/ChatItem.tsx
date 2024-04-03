import { useEffect, useState } from 'react';
import { useChat } from "../../../../context/useChat";
import { Chat } from "../../../../interfaces/context.interfaces";
import { UserChat } from '../../../../interfaces/user.interface';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Divider from '@mui/material/Divider';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';

interface Props {
    chat: Chat;
}

export default function ChatItem({chat}:Props) {

  const { users, user, selectChat, otherUser } = useChat();
  const [receivingUser, setReceivingUser] = useState<UserChat>({
    _id: '',
    email: '',
    fullName: '',
    phone: '',
    age: 0,
    isActive: false
  });

  useEffect(() => {
    getOtherUser(chat.users);
  },[])

  const getOtherUser = (idUsers:string[]) => {
    const idOtherUser = idUsers.find(idUser => idUser !== user._id)
    const otherUser = users.find(user => user._id === idOtherUser);
    if(otherUser)
      setReceivingUser(otherUser);
    return otherUser;
  }

  const getMessageDate = () => {
  
    if(chat.messages.length === 0 ) return;

    const date: string = chat.messages[chat.messages.length - 1].updatedAt;
    const messageDate: Date = new Date(date);
    const currentDate: Date = new Date();

    const daysDifference: number = Math.floor(
      (currentDate.getTime() - messageDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    const messageDay: number = messageDate.getDate();
    const currentDay: number = currentDate.getDate();
    const dayDif: number = currentDay - messageDay;

    const hour = messageDate.getHours();
    const min = messageDate.getMinutes().toString().padStart(2, '0');

    if( dayDif === 1 && daysDifference <= 1 )
      return 'Yesterday';
    
    if(daysDifference >= 1)
      return messageDate.toLocaleDateString();
    
    return `${hour}:${min}`;
  }

  return (
    <>
      <ListItemButton
        onClick={() => selectChat(chat, receivingUser)}
        selected={receivingUser._id === otherUser._id}
        sx={{
          height:73
        }}
      >
        <ListItemSecondaryAction>
          <ListItemText 
            primaryTypographyProps={{fontSize: '13px', color:'textSecondary'}} 
            primary={ getMessageDate() }
            
            // TODO: validar cuando se reciban mensajes nuevos sin leer.
            // secondary={ ( activeChat._id !== chat._id && chat.messages.length // validar cuando hayan mensajes nuevos //  ) && '{X}'
            //  }
          />
        </ListItemSecondaryAction>

        <ListItemAvatar>
          <Avatar 
            sx={{ marginRight:1, width:50, height:50 }} 
            alt={receivingUser.fullName} 
            src={receivingUser.photo}
            />
        </ListItemAvatar>

        <ListItemText 
          sx={{ marginLeft:1 }}
          primary={ receivingUser.fullName } 
          secondary={ 
            chat.messages.length !== 0 && chat.messages[chat.messages.length - 1].message 
          }
        />

      </ListItemButton>

      <Divider variant="inset" component="li" sx={{marginRight:1}} />
    </>
  )
}
