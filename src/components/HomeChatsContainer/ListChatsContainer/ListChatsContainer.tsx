import List from '@mui/material/List';
import { useChat } from '../../../context/useChat';
import ChatItem from './ChatItem/ChatItem';

export default function ListChatsContainer() {

  const { chats } = useChat();

  return (
    <List sx={{ padding:0, margin:0 }}>
      {
        chats.map(chat => (
          <ChatItem chat={chat} key={chat._id}  />
        ))
      }
    </List>
  )
}
