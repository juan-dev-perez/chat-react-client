import { createContext, useEffect, useRef, useState } from "react";
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

const ChatProvider: React.FC<Props> = ({ children }) => {
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

  const activeChatRef = useRef(activeChat);
  const otherUserRef = useRef(otherUser);

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

  const seenInActiveChat = (chat: Chat): void => {
    console.log("se ejecuto seen in active chat");

    if (chat.messages[chat.messages.length - 1].seen === false) {
      verifySeen(otherUserRef.current);
    }

    return;
  };

  const handleIncomingChat = (chat: Chat) => {
    const lastMessage = chat.messages[chat.messages.length - 1];
    if (
      chat._id === activeChatRef.current._id &&
      lastMessage.sendingUser === otherUserRef.current._id
    )
      seenInActiveChat(chat);
    setChats((prevChats) => {
      const existing = prevChats.find((oneChat) => oneChat._id === chat._id);
      if (existing) {
        return prevChats.map((oneChat) =>
          oneChat._id === chat._id ? chat : oneChat
        );
      } else {
        return [...prevChats, chat];
      }
    });
  };

  useEffect(() => {
    activeChatRef.current = activeChat;
  }, [chats]);

  useEffect(() => {
    otherUserRef.current = otherUser;
  }, [otherUser]);

  // Montaje
  useEffect(() => {
    if (!getJWT()) return navigate("/login");
    connectToServer();
    getChats();
    getUsers();
  }, []);

  // Websockets
  useEffect(() => {
    if (!socket || !socket.on) return;
    socket.on("message-from-server", handleIncomingChat);
    return () => {
      socket.off("message-from-server", handleIncomingChat);
    };
  }, []);

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

export default ChatProvider;
