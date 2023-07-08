import { useChat } from '../../../context/useChat';
import WhitoutChatContainer from './WhitoutChatContainer/WhitoutChatContainer';
import WhitChatContainer from './WhitChatContainer/WhitChatContainer';

export default function ChatContainer() {
 
  const { activeChat } = useChat(); 

  return (
    <>
      {
        (Object.entries(activeChat).length === 0) ?
          <WhitoutChatContainer/>
        :
          <WhitChatContainer/>
      }
    </>
  )
}