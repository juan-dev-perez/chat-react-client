import { useChat } from '../../../context/useChat';
import ChatItem from './ChatItem/ChatItem';

export default function ListChatsContainer() {

  const { chats } = useChat();

  return (
    <div className="list-chats-grid">
      {
        chats.map(chat => (
          <ChatItem chat={chat} key={chat._id}  />
        ))
      }
    </div>
  )
}
