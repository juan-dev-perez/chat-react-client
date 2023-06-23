import axios from "axios";
import { User, UserLogin } from '../interfaces/user.interface';
import { NewMessage } from "../interfaces/context.interfaces";

export const register = async (user: User) =>
    await axios.post('http://localhost:3000/api/users/register', user);

export const login = async (userLogin: UserLogin) => 
    await axios.post('http://localhost:3000/api/auth/login', userLogin);

export const getAllChats = async(jwt: string) => 
    await axios('http://localhost:3000/api/chat', { headers: {'Authorization': `Bearer ${jwt}` }});

export const newMessage = async(message: NewMessage, jwt: string) =>
    await axios.post('http://localhost:3000/api/chat/new-message', message ,{ headers: {'Authorization': `Bearer ${jwt}` }});