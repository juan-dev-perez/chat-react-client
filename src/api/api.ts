import axios from "axios";
import { User } from "../interfaces/user.interface";

export const register = async (newUser: User) =>
    await axios.post('http://localhost:3000/api/users/register', newUser);
