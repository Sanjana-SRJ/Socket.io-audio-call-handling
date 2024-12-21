import express from 'express';
import { Server } from 'socket.io';

const app = express();
const httpServer = app.listen(8000, () => console.log("HTTP server running at Port 8000"));
const io = new Server(httpServer, {
    cors: true,
});

io.on('connection', (socket) => {
    console.log('A user connected',socket.id);

    socket.on('offer', (data) => {
        console.log('Received offer:', data);
        socket.broadcast.emit('offer', data);
    });

    socket.on('answer', (data) => {
        console.log('Received answer:', data);
        socket.broadcast.emit('answer', data);
    });

    socket.on('candidate', (data) => {
        console.log('Received candidate:', data);
        socket.broadcast.emit('candidate', data);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

