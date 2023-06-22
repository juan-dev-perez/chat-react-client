import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Chat, ChatContextValue, Props } from "../interfaces/context.interfaces";
import { getAllChats } from "../api/api";
import { getJWT } from "../common/auth-cookie";

export const ChatContext = createContext<ChatContextValue>({
  chats: [],
});

export const ChatProvider: React.FC<Props> = ({ children }) => {

  const navigate = useNavigate();
    
  const [chats, setChats] = useState<Chat[]>([]);

  const getChats = async () => {
    const { data } = await getAllChats(getJWT());
    setChats(data)
  }

  useEffect(() => {
    if(!getJWT()) navigate('/login'); 
    getChats();
  },[]);

  return (
    <ChatContext.Provider value={{ chats }}>
        {children}
    </ChatContext.Provider>
  );
};