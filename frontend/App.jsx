import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

export default function App() {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    const socketClient = io("http://localhost:4002");

    socketClient.on("connect", () => {
      console.log("connected with id:" + socketClient.id);
    });

    socketClient.on("disconnect", () => {
      console.log("disconnected");
    });

    socketClient.on("greet", (message) => {
      console.log("got", message)
      setMessages((prev) => [...prev, message])
    });

    setSocket(socketClient);
  }, []);

  const onClick = (e) => {
    e.preventDefault();
    if (socket) {
      const message = { id: socket.id, message: text };
      socket.emit("greet", message);
      setMessages((prev) => [...prev, message]);
      setText("");
    }
  }

  return (
    <>
      <div style={{ width: "300px", display: "flex", flexDirection: "column" }}>
        {messages.map((message, i) => (
          <div key={i} style={{
            display: "flex",
            justifyContent: message.id === socket.id ? "end" : "start"
          }}>
            <div style={{
              maxWidth: "200px",
              backgroundColor: message.id === socket.id ? "#478eff" : "#d2d3d6",
              padding: "5px",
              borderRadius: "10px"
            }}>{message.message}</div>
          </div>
        ))}
      </div>
      <form onSubmit={onClick}>
        <input value={text} onChange={(e) => setText(e.target.value)}/>
        <button type="submit">Send</button>
      </form>
    </>
  );
}
