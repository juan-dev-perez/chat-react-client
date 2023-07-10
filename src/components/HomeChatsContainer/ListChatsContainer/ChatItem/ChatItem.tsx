import { useEffect, useState } from 'react';
import { useChat } from "../../../../context/useChat";
import { Chat } from "../../../../interfaces/context.interfaces";
import { UserPartial } from '../../../../interfaces/user.interface';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';

interface Props {
    chat: Chat;
}

export default function ChatItem({chat}:Props) {

  const { users, user, selectChat, otherUser } = useChat();
  const [receivingUser, setReceivingUser] = useState<UserPartial>();

  useEffect(() => {
    getOtherUser(chat.users);
  },[])

  const getOtherUser = (idUsers:string[] | undefined) => {
    const idOtherUser = idUsers?.find(idUser => idUser !== user._id)
    const otherUser = users.find(user => user._id === idOtherUser);
    setReceivingUser(otherUser);
    return otherUser;
  }

  const getMessageDate = () => {
    const date = chat.messages?.[chat.messages.length - 1].updatedAt;
    const newDate = new Date(date);
    
    const hour = newDate.getHours();
    const min = newDate.getMinutes();
    
    return `${hour}:${min}`;
  }

  return (
    <>
      <ListItemButton
        onClick={() => selectChat(chat, receivingUser)}
        selected={receivingUser?._id === otherUser?._id}
        sx={{
          height:73
        }}
      >
        <ListItem secondaryAction={
          <ListItemText 
            primaryTypographyProps={{fontSize: '13px', color:'textSecondary'}} 
            primary={ getMessageDate() }
            // secondary={ }
          />
        }>

          <ListItemAvatar>
            <Avatar 
              sx={{ marginRight:1, width:50, height:50 }} 
              alt={receivingUser?.fullName} 
              src="/static/images/avatar/1.jpg"
              />
          </ListItemAvatar>

          <ListItemText 
            sx={{ marginLeft:1 }}
            primary={ receivingUser?.fullName } 
            secondary={ chat.messages?.[chat.messages.length - 1].message }
          />

        </ListItem>
      </ListItemButton>

      <Divider variant="inset" component="li" />
    </>
  )
}
