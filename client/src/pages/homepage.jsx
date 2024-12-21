import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSocket } from '../providers/socketIO';

const Home = () => {
    const navigate=useNavigate();
    const { socket } = useSocket();

    const [email, setEmail] = useState();
    const [room, setRoom] = useState();

    const handleJoinRoom = useCallback((e) => {
        e.preventDefault();
        console.log(email, room);
        socket.emit('join-room', { email, room });
    }, [email, room, socket]);

    const handleMeetingRoom = useCallback((data) => {
        const { email, room } = data;
        navigate(`/room/${room}`);
    }, [navigate]);

    useEffect(() => {
        socket.on("room:join", handleMeetingRoom);
        return () => {
            socket.off('room:join',handleJoinRoom);
        };
    },[socket, handleMeetingRoom]
    );

    return (
        <div className='homePage'>
            <div className='input-container'>
                <h1>Welcome </h1>
                <form onSubmit={handleJoinRoom}>
                    <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder='Enter Email Here' id='email' /><br />
                    <input value={room} onChange={e => setRoom(e.target.value)} type="text" placeholder="Enter Room Code" id='room' /><br />
                    <button> Join Room</button>
                </form>
            </div>
        </div>
    )

}
export default Home;