import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Chat, ChatContextValue, Props } from "../interfaces/context.interfaces";
import { getAllChats } from "../api/api";
import { getJWT } from "../common/auth-cookie";
import { UserChat } from "../interfaces/user.interface";
import { connectToServer, socket } from "../websockets/socket";

const initialUser = {
  _id: '',
  email: '',
  fullName: '',
  phone: '',
  age: 0,
  isActive: false
};

const initialChat = {
  _id: '',
  users: [],
  messages: []
}

export const ChatContext = createContext<ChatContextValue>({
  chats: [],
  users: [],
  user: initialUser,
  activeChat: initialChat,
  selectChat: () => void{},
  otherUser: initialUser,
});

export const ChatProvider: React.FC<Props> = ({ children }) => {

  const navigate = useNavigate();
    
  const [chats, setChats] = useState<Chat[]>([]);
  const [users, setUsers] = useState<UserChat[]>([]);
  const [activeChat, setActiveChat] = useState<Chat>( initialChat );
  const [user, setUser] = useState<UserChat>( initialUser );
  const [otherUser, setOtherUser] = useState<UserChat>( initialUser );

  const selectChat = (chat: Chat, otherUser:UserChat) => {
    setActiveChat(chat);
    setOtherUser(otherUser);
  }

  const getChats = async () => {
    const { data } = await getAllChats(getJWT());
    setChats(data.chats);
    setUsers(data.users);
    setUser(data.user);    
  }

  useEffect(() => {
    if(!getJWT()) return navigate('/login'); 
    connectToServer();
    getChats();
  },[]);

  useEffect( () => {
    if(socket){
      socket.on('message-from-server', (chat:Chat) => {
        setChats( chats.map(oneChat => oneChat._id === chat._id ? chat : oneChat));
      })
    }
  },[chats]);

  return (
    <ChatContext.Provider value={{ chats, users, user, activeChat, selectChat, otherUser }}>
        {children}
    </ChatContext.Provider>
  );
};