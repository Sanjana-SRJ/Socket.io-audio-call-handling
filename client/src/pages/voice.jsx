import React, { useEffect, useState } from 'react';
import { useSocket } from '../providers/socketIO';

const Voice = () => {
    const socket = useSocket();
    const [localStream, setLocalStream] = useState(null);
    const [peerConnection, setPeerConnection] = useState(null);
    const [remoteAudio, setRemoteAudio] = useState(null);
    const configuration = {
        iceServers: [
            { urls: 'stun:stun.l.google.com:19302' }
        ]
    };

    const startCallButton = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            setLocalStream(stream);

            const pc = new RTCPeerConnection(configuration);
            setPeerConnection(pc);

            stream.getTracks().forEach(track => pc.addTrack(track, stream));

            pc.onicecandidate = ({ candidate }) => {
                if (candidate) {
                    console.log('Sending candidate:', candidate);
                    socket?.emit('candidate', candidate);
                }
            };

            pc.ontrack = (event) => {
                console.log('Received remote track');
                const [remoteStream] = event.streams;
                const audioElement = document.createElement('audio');
                audioElement.srcObject = remoteStream;
                audioElement.autoplay = false;
                document.body.appendChild(audioElement);
                setRemoteAudio(audioElement);
            };

            const offer = await pc.createOffer();
            await pc.setLocalDescription(offer);

            console.log('Sending offer:', offer);
            socket.emit('offer', offer);
        } catch (error) {
            console.error('Error accessing media devices.', error);
        }
    };

    const enableAudioButton = () => {
        if (remoteAudio) {
            remoteAudio.play().catch(error => {
                console.error('Error playing audio:', error);
            });
        }
    };

    const endCallButton = () => {
        if (peerConnection) {
            peerConnection.close();
            localStream.getTracks().forEach(track => track.stop());
            console.log('Call ended');
            if (remoteAudio) {
                remoteAudio.pause();
                remoteAudio.srcObject = null;
                remoteAudio.remove();
                setRemoteAudio(null);
            }
        }
    };

    useEffect(() => {
        if (!socket) return;

        socket.on('offer', async (offer) => {
            try {
                const pc = new RTCPeerConnection(configuration);
                setPeerConnection(pc);

                pc.onicecandidate = ({ candidate }) => {
                    if (candidate) {
                        console.log('Sending candidate:', candidate);
                        socket?.emit('candidate', candidate);
                    }
                };

                pc.ontrack = (event) => {
                    console.log('Received remote track');
                    const [remoteStream] = event.streams;
                    const audioElement = document.createElement('audio');
                    audioElement.srcObject = remoteStream;
                    audioElement.autoplay = false;
                    document.body.appendChild(audioElement);
                    setRemoteAudio(audioElement);
                };

                await pc.setRemoteDescription(offer);
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                setLocalStream(stream);

                stream.getTracks().forEach(track => pc.addTrack(track, stream));

                const answer = await pc.createAnswer();
                await pc.setLocalDescription(answer);

                console.log('Sending answer:', answer);
                socket.emit('answer', answer);
            } catch (error) {
                console.error('Error handling offer.', error);
            }
        });

        socket.on('answer', async (answer) => {
            try {
                console.log('Received answer:', answer);
                await peerConnection.setRemoteDescription(answer);
            } catch (error) {
                console.error('Error handling answer.', error);
            }
        });

        socket.on('candidate', async (candidate) => {
            try {
                console.log('Received candidate:', candidate);
                await peerConnection.addIceCandidate(candidate);
            } catch (error) {
                console.error('Error adding received ice candidate', error);
            }
        });

        return () => {
            socket.off('offer');
            socket.off('answer');
            socket.off('candidate');
        };
    }, [socket, peerConnection]);

    return (
        <div className='VoiceApp'>
            <button id="startCallButton" onClick={startCallButton}>Start Call</button>
            <button id="endCallButton" onClick={endCallButton}>End Call</button>
            <button id="enableAudioButton" onClick={enableAudioButton}>Enable Audio</button>
        </div>
    );
};

export default Voice;
