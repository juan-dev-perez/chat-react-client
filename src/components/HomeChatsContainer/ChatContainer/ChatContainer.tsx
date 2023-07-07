import { useChat } from '../../../context/useChat';
import './ChatContainer.css';
import InfoOtherUser from './InfoOtherUser/InfoOtherUser';
import InputMessage from './InputMessage/InputMessage';
import MessagesContainer from './MessagesContainer/MessagesContainer';

export default function ChatContainer() {

  const { activeChat, user } = useChat(); 

  if((Object.entries(activeChat).length === 0)){
    return (
      <div className="chat-grid">
        'No se ha seleccionado un chat aun'
      </div>
    )
  }

  return (
    <div className="chat-grid">
      <InfoOtherUser/>
      <MessagesContainer activeChat={activeChat} user={user} />
      <InputMessage/>
    </div>
  )
}
