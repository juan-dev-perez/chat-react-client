import { ChatProvider } from "../../context/ChatContext";
import ChatContainer from "./ChatContainer/ChatContainer";
import ListChatsContainer from "./ListChatsContainer/ListChatsContainer";
import ProfileContainer from "./ProfileContainer/ProfileContainer";
import './HomeChatsContainer.css';

export default function HomeChatsContainer() {

  return (
    <ChatProvider>
      <div className="home-container">
        <ProfileContainer/>
        <ListChatsContainer/>
        <ChatContainer/>
      </div>
    </ChatProvider>
  )
}