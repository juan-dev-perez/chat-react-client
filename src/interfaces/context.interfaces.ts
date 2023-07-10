import { UserPartial, UserChat } from "./user.interface";

export interface ChatContextValue {
  chats: Chat[];
  users: UserChat[];
  activeChat: Chat;
  user: UserPartial;
  selectChat: (chat:Chat, otherUser: UserPartial | undefined) => void;
  otherUser: UserPartial | undefined;
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
  receivingUser: string | undefined;
  message: string;
}