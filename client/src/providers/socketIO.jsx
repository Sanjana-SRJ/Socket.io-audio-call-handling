import { useMemo, useContext, createContext } from 'react';
import React from "react";
import { io } from 'socket.io-client';

const socketContext = createContext(null);

export const useSocket = () => {
    return useContext(socketContext);
};

export const SocketProvider = (props) => {
    const socket = useMemo(() => io('http://localhost:8000'), []); // Ensure the URL has the correct protocol

    return (
        <socketContext.Provider value={socket}>
            {props.children}
        </socketContext.Provider>
    );
};
