import { useChat } from '../../../context/useChat';
import WhitoutChatContainer from './WhitoutChatContainer/WhitoutChatContainer';
import WhitChatContainer from './WhitChatContainer/WhitChatContainer';

export default function ChatContainer() {
 
  const { activeChat } = useChat(); 

  return (
    <>
      {
        activeChat._id === '' ?
          <WhitoutChatContainer/>
        :
          <WhitChatContainer/>
      }
    </>
  )
}