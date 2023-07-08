import List from '@mui/material/List';
import { useChat } from '../../../context/useChat';
import ChatItem from './ChatItem/ChatItem';
import Divider from '@mui/material/Divider';

export default function ListChatsContainer() {

  const { chats } = useChat();

  return (
    <List component='nav'>
      {
        chats.map(chat => (
          <>
            <ChatItem chat={chat} key={chat._id}  />
            <Divider variant="inset" component="li" />
          </>
        ))
      }
    </List>
  )
}
