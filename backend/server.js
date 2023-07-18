const express = require("express");
const { Server } = require("socket.io");
const { createServer } = require("http");

const PORT = 4000;
const CLIENT_DOMAIN = `http://localhost:3333`

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: CLIENT_DOMAIN,
    methods: ["GET", "POST"],
    allowedHeaders: ["*"],
  }
});

io.on("connection", client => {
  client.on("newGameState", data => {
    debugger
    client.broadcast.emit("newGameState", data);
  });

  client.on("disconnect", () => {
    console.log("disconnected");
  });
});
 
server.listen(PORT);