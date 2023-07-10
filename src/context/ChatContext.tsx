import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Chat, ChatContextValue, Props } from "../interfaces/context.interfaces";
import { getAllChats } from "../api/api";
import { getJWT } from "../common/auth-cookie";
import { UserPartial, UserChat } from "../interfaces/user.interface";
import { connectToServer, socket } from "../websockets/socket";

export const ChatContext = createContext<ChatContextValue>({
  chats: [],
  users: [],
  user:{},
  activeChat: {_id: '', users: [], messages:[]},
  selectChat: () => void{},
  otherUser: {},
});

export const ChatProvider: React.FC<Props> = ({ children }) => {

  const navigate = useNavigate();
    
  const [chats, setChats] = useState<Chat[]>([]);
  const [users, setUsers] = useState<UserChat[]>([]);
  const [user, setUser] = useState<UserPartial>({});
  const [activeChat, setActiveChat] = useState<Chat>({_id: '', users: [], messages:[]});
  const [otherUser, setOtherUser] = useState<UserPartial | undefined>({});

  const selectChat = (chat: Chat, otherUser:UserPartial | undefined) => {
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