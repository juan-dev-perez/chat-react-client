import { useEffect, useState } from 'react';
import { Button } from "@mui/material";
import { useChat } from "../../../../context/useChat";
import { Chat } from "../../../../interfaces/context.interfaces";
import { UserPartial } from '../../../../interfaces/user.interface';

interface Props {
    chat: Chat;
}

export default function ChatItem({chat}:Props) {

  const { users, user, selectChat } = useChat();
  const [otherUser, setOtherUser] = useState<UserPartial>();

  useEffect(() => {
    getOtherUser(chat.users);
  },[])

  const getOtherUser = (idUsers:string[] | undefined) => {
    const idOtherUser = idUsers?.find(idUser => idUser !== user._id)
    const otherUser = users.find(user => user._id === idOtherUser);
    setOtherUser(otherUser);
    return otherUser;
  }

  return (
    <div>
      <Button sx={{width:'100%'}} onClick={() => selectChat(chat, otherUser)}>
        {
          otherUser?.fullName
        }
      </Button>
    </div>
  )
}
