import { useChat } from "../../../../context/useChat";
import { Chat } from "../../../../interfaces/context.interfaces"
import { UserPartial } from "../../../../interfaces/user.interface";
import './MessagesContainer.css';

interface Props{
    activeChat:Chat;
    user: UserPartial;
}

export default function MessagesContainer({activeChat, user}:Props) {

    const { chats } = useChat();
    const chat = chats.find(oneChat => oneChat._id === activeChat._id);

    const getUser = (id: string) => {
        if(user._id === id) return 'right'
        return 'left';
    }
    
  return (
    <div className="chats-container">
        {
            chat?.messages?.map( message => (
                <div key={message._id} style={{
                    textAlign:getUser(message.sendingUser),
                    margin: 20,
                    bottom:'0px'
                }}>
                    <span>{message.message}</span>
                </div>
            ))
        }
    </div>
  )
}
