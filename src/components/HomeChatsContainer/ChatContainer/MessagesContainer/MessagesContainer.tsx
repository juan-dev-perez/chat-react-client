import { Chat } from "../../../../interfaces/context.interfaces"
import { UserPartial } from "../../../../interfaces/user.interface";

interface Props{
    activeChat:Chat;
    otherUser:UserPartial | undefined;
    user: UserPartial;
}

export default function MessagesContainer({activeChat, otherUser, user}:Props) {
    console.log(activeChat,otherUser,user);

    const getName = (id: string) => {
        if(user._id === id) return user.fullName
        return otherUser?.fullName;
    }
    
  return (
    <div>
        {
            activeChat.messages?.map( message => (
                <div key={message._id}>
                    <span>{getName(message.sendingUser)}: </span>
                    <span>{message.message}</span>
                </div>
            ))
        }
    </div>
  )
}
