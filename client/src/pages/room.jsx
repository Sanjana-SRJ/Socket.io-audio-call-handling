/*import React, { useEffect, useCallback,useState} from "react";
import { useSocket } from "../providers/socketIO";

const Roompage = () => {
    const socket = useSocket();
    //const [remoteSocketId,setRemoteSocketId]=useState(null);

    const handleUserJoined = useCallback(({ email, id }) => {
        console.log(`Email ${email} joined user`);
       // setRemoteSocketId(id)
    }, []);

    useEffect(() => {
        if (socket) {
            socket.on('user:join', handleUserJoined);
            return () => {
                socket.off('user:join', handleUserJoined);
            };
        }
    }, [socket, handleUserJoined]);
    
return (
        <div>
            <h1>Room Page</h1>
            <h4>yes joined</h4>
        </div>
    );
};
export default Roompage;*/