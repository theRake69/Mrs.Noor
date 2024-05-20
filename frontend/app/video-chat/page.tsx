"use client";
import { useEffect, useRef } from "react";
import io from "socket.io-client";

const VideoChat = () => {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  let socket: SocketIOClient.Socket;

  useEffect(() => {
    socket = io("http://localhost:3001");

    socket.on("offer", async (data: RTCSessionDescriptionInit) => {
      try {
        const peerConnection = createPeerConnection();
        peerConnectionRef.current = peerConnection;

        await peerConnection.setRemoteDescription(
          new RTCSessionDescription(data)
        );

        const answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answer);
        socket.emit("answer", answer);
      } catch (error) {
        console.error("Error handling offer:", error);
      }
    });

    socket.on("answer", async (data: RTCSessionDescriptionInit | null) => {
      if (data) {
        try {
          await peerConnectionRef.current?.setRemoteDescription(
            new RTCSessionDescription(data)
          );
        } catch (error) {
          console.error("Error handling answer:", error);
        }
      } else {
        console.error("Received null session description data");
      }
    });

    socket.on("candidate", async (data: RTCIceCandidateInit) => {
      await peerConnectionRef.current?.addIceCandidate(
        new RTCIceCandidate(data)
      );
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const createPeerConnection = () => {
    const peerConnection = new RTCPeerConnection();

    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("candidate", event.candidate);
      }
    };

    peerConnection.ontrack = (event) => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = event.streams[0];
      } else {
        console.error("Remote video ref is null or undefined");
      }
    };

    return peerConnection;
  };

  const startVideoChat = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
      const peerConnection = createPeerConnection();
      peerConnectionRef.current = peerConnection;

      stream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, stream);
      });

      // Initializing the offer when the video chat starts
      const offer = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(offer);
      socket.emit("offer", offer);
    } catch (error) {
      console.error("Error starting video chat!", error);
    }
  };

  const disconnectVideoChat = async () => {
    // stop all the tracks in local media stream if exists
    localStreamRef.current?.getTracks().forEach((track) => track.stop());
    localStreamRef.current = null;

    // close the peer connection if exists
    peerConnectionRef.current?.close();
    peerConnectionRef.current = null;

    // Emit a disconnect event to the server
    socket?.emit("manual-disconnect");

    // clear the video elemets
    [localVideoRef.current, remoteVideoRef.current].forEach((videoRef) => {
      if (videoRef) {
        videoRef.srcObject = null;
      }
    });
  };

  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <h1 className="text-3xl font-bold mb-4">Video chat!</h1>
      <div className="relative w-full h-3/4  p-6 flex">
        <video
          ref={localVideoRef}
          autoPlay
          playsInline
          muted
          className="w-1/2 h-full object-cover m-4"
        />
        <video
          ref={remoteVideoRef}
          autoPlay
          playsInline
          muted
          className="w-1/2 h-full object-cover m-4"
        />
      </div>
      <div className="flex gap-2">
        <button
          className="z-999 mt-6 px-5 py-3 bg-blue-500 text-white rounded "
          onClick={startVideoChat}
        >
          Start Video chat
        </button>
        <button
          className="z-999 mt-6 px-5 py-3 bg-red-500 text-white rounded"
          onClick={disconnectVideoChat}
        >
          Disconnect
        </button>
      </div>
    </div>
  );
};
export default VideoChat;
