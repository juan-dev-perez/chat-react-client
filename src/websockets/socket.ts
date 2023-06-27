import { Manager, Socket } from "socket.io-client";
import { Chat } from "../interfaces/context.interfaces";
import { getJWT } from "../common/auth-cookie";

export let socket: Socket;


export const connectToServer = () => {
    
    const manager = new Manager('http://localhost:3000/socket.io/socket.io.js',{
        extraHeaders:{
            jwtclient: getJWT()
        }
    });
    
    socket = manager.socket('/');
    
    // addListeners();
    
}

// const addListeners = () => {
    
//     socket.on('message-from-server',(chat) => {
//         updateChat(chat);
//     }
//     )

// }

export const emitFromClient = (chat: Chat) => {
    socket.emit('message-from-client', chat );
}