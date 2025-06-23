import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const ChatApp = () => {
  const [socket, setSocket] = useState(null);
  const [messageInput, setMessageInput] = useState("");
  const [roomInput, setRoomInput] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const newSocket = io("http://localhost:3000");
    setSocket(newSocket);

    newSocket.on("connect", () => {
      displayMessage(`✅ Connected: ${newSocket.id}`);
    });

    newSocket.on("receive-message", (msg) => {
      displayMessage(`👤 Other: ${msg}`);
    });

    newSocket.emit("custom-event", 42, "Hello", { key: "value" });

    return () => newSocket.disconnect();
  }, []);

  const displayMessage = (msg) => {
    setMessages((prev) => [...prev, msg]);
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!messageInput || !socket) return;
  };

  const handleJoinRoom = () => {
    if (!roomInput || !socket) return;

    socket.emit("join-room", roomInput);
    displayMessage(`🏠 Joined room: ${roomInput}`);
    setRoomInput("");
  };

  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto p-4">
      <div className="flex-1 overflow-y-auto border border-gray-400 rounded p-2 mb-4">
        {messages.map((msg, idx) => (
          <div key={idx} className="mb-1 bg-gray-100 p-2 rounded">
            {msg}
          </div>
        ))}
      </div>

      <form onSubmit={handleSend} className="flex flex-col gap-2">
        <div className="flex gap-2">
          <input
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            placeholder="Enter message"
            className="flex-1 border px-2 py-1 rounded"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-1 rounded"
          >
            Send
          </button>
        </div>

        <div className="flex gap-2">
          <input
            value={roomInput}
            onChange={(e) => setRoomInput(e.target.value)}
            placeholder="Enter room name"
            className="flex-1 border px-2 py-1 rounded"
          />
          <button
            type="button"
            onClick={handleJoinRoom}
            className="bg-green-500 text-white px-4 py-1 rounded"
          >
            Join Room
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatApp;
