import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Chat,
  ChatContextValue,
  Props,
} from "../interfaces/context.interfaces";
import { getAllChats, getAllUsers } from "../api/api";
import { getJWT } from "../common/auth-cookie";
import { UserChat } from "../interfaces/user.interface";
import { connectToServer, socket, verifySeen } from "../websockets/socket";

const initialUser = {
  _id: "",
  email: "",
  fullName: "",
  phone: "",
  age: 0,
  isActive: false,
};

const initialChat = {
  _id: "",
  users: [],
  messages: [],
};

export const ChatContext = createContext<ChatContextValue>({
  chats: [],
  users: [],
  user: initialUser,
  activeChat: initialChat,
  selectChat: () => void {},
  otherUser: initialUser,
  closeChat: () => void {},
  updateUser: () => void {},
  showNotification: false,
  successNotification: false,
  messageNotification: "",
  closeNotification: () => void {},
  renderNotification: () => void {},
  allUsers: [],
});

export const ChatProvider: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate();

  const [chats, setChats] = useState<Chat[]>([]);
  const [users, setUsers] = useState<UserChat[]>([]);
  const [allUsers, setAllUsers] = useState<UserChat[]>([]);
  const [activeChat, setActiveChat] = useState<Chat>(initialChat);
  const [user, setUser] = useState<UserChat>(initialUser);
  const [otherUser, setOtherUser] = useState<UserChat>(initialUser);
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const [successNotification, setSuccessNotification] =
    useState<boolean>(false);
  const [messageNotification, setMessageNotification] = useState<string>("");

  const selectChat = (chat: Chat, otherUser: UserChat) => {
    setActiveChat(chat);
    setOtherUser(otherUser);
    verifySeen(otherUser);
  };

  const getChats = async () => {
    const { data } = await getAllChats(getJWT());
    setChats(data.chats);
    setUsers(data.users);
    setUser(data.user);
  };

  const getUsers: () => void = async () => {
    const { data } = await getAllUsers(getJWT());
    setAllUsers(data);
  };

  const closeChat = () => {
    setActiveChat(initialChat);
    setOtherUser(initialUser);
  };

  const updateUser = (user: UserChat) => {
    setUser(user);
  };

  const renderNotification = (success: boolean, message: string): void => {
    setShowNotification(true);
    setSuccessNotification(success);
    setMessageNotification(message);
  };

  const closeNotification = (): void => {
    setShowNotification(false);
  };

  

  useEffect(() => {
    if (!getJWT()) return navigate("/login");
    connectToServer();
    getChats();
    getUsers();
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("message-from-server", (chat: Chat) => {
        setChats(
          chats.map((oneChat) => (oneChat._id === chat._id ? chat : oneChat))
        );
      });
    }
  }, [chats]);

  return (
    <ChatContext.Provider
      value={{
        chats,
        users,
        user,
        activeChat,
        selectChat,
        otherUser,
        closeChat,
        updateUser,
        showNotification,
        successNotification,
        messageNotification,
        closeNotification,
        renderNotification,
        allUsers,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
