import { Server } from "socket.io"
import http from 'http'
import express from 'express'
//import { disconnect } from "process";
 
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
       origin: ['http://localhost:5173',
               'https://chat-app-j31o.onrender.com'
              ],
        methods: ["GET", "POST"],
      credentials: true
    }
});

export const getReceiverSocketId = (receiverObjectId) =>{
    return usersocketMap[receiverObjectId];
}

const usersocketMap = {
    userId: "socketId",

};


io.on('connection', (socket) => {
    console.log('🔌 user connected', socket.id);

    const userId = socket.handshake.query.userId
    if (userId) {
        usersocketMap[userId] = socket.id;
    }

    io.emit('getOnlineUsers', Object.keys(usersocketMap))

    socket.on('disconnect', () => {
        console.log('🔌 user disconnected', socket.id);
        delete usersocketMap[userId];
        io.emit('getOnlineUsers', Object.keys(usersocketMap))

    })

})



export { app, io, server };

