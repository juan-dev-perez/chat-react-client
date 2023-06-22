export interface ChatContextValue {
  chats: Chat[];
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