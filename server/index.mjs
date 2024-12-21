/*import express from 'express';
import { Server } from 'socket.io';
import bodyParser from 'body-parser';

const app = express();
const httpServer = app.listen(8000, () => console.log("HTTP server running at Port 8000"));
const io = new Server(httpServer, {
    cors: true,
});

app.use(bodyParser.json());

const EmailtoSocketMapping = new Map();
const socketToEmailMapping = new Map();

io.on('connection', (socket) => {
    console.log('New connection', socket.id);
    socket.on("join-room", (data) => {
        //console.log(data);
        const { room, email } = data;
        //console.log("User", Email, "joined room", room);
        EmailtoSocketMapping.set(email, socket.id);
        socketToEmailMapping.set(socket.id, email);
        io.to(room).emit("user:joined",{email, id :socket.id});
        socket.join(room);
        io.to(socket.id).emit("room:join", data);
        

        //socket.broadcast.to(room).emit("user-joined", { Email });
    });
});

console.log("Socket.IO server running at Port 8001");
*/