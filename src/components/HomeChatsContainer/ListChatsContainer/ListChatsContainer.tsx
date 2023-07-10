import List from '@mui/material/List';
import { useChat } from '../../../context/useChat';
import ChatItem from './ChatItem/ChatItem';

export default function ListChatsContainer() {

  const { chats } = useChat();

  return (
    <List component='nav'>
      {
        chats.map(chat => (
          <ChatItem chat={chat} key={chat._id}  />
        ))
      }
    </List>
  )
}
