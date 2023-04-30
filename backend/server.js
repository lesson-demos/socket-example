const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");

const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:4000",
    methods: ["GET", "POST"],
    allowedHeaders: ["*"],
  }
});

const PORT = 4001;

io.on("connection", client => {

  client.on("greet", data => {
    client.broadcast.emit("greet", data);
  });

  client.on("disconnect", () => {
    console.log("disconnected");
  });
});

app.use(morgan());
app.use(express.json());
app.use(cors())

app.get("/", (req, res) => {
  console.log("here");
  res.sendStatus(200);
});
 
server.listen(PORT+1);
app.listen(PORT, () => {
  console.log(`Your backend is listening on port ${PORT}`);
  console.log(`Your socket server is listening on port ${PORT+1}`);
});