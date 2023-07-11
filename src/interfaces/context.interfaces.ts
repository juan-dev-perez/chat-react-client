import { UserChat } from "./user.interface";

export interface ChatContextValue {
  chats: Chat[];
  users: UserChat[];
  activeChat: Chat;
  user: UserChat;
  selectChat: (chat:Chat, otherUser: UserChat) => void;
  otherUser: UserChat;
}

export interface Props {
  children: React.ReactNode;
}

interface Message{
    _id: string;
    sendingUser: string;
    message: string;
    createdAt: string;
    updatedAt: string;
}
  
export interface Chat{
    _id: string;
    users: string[];
    messages: Message[];
}

export interface NewMessage{
  receivingUser: string;
  message: string;
}