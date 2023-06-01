const express = require("express");
const app = express();
const cors = require("cors");

const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:4009",
    methods: ["GET", "POST"],
    allowedHeaders: ["*"],
  }
});

const PORT = 4010;

let gameCount = 0;
const games = {}

function findOrCreateGame(clientId) {
  if (!(clientId in games)) {
    const openGame = Object.values(games).find(game => game.playerIds.length < 2);
    games[clientId] = openGame ?? {
      playerIds: [],
      turn: 1,
      board: [
        [0,0,0],
        [0,0,0],
        [0,0,0]
      ],
      gameId: gameCount++
    }
    games[clientId].playerIds.push(clientId);
  }
  return games[clientId]
}

io.on("connection", client => {
  findOrCreateGame(client.id);

  client.on("make-move", ({ move }) => {
    const game = findOrCreateGame(client.id);
    
    // if the move is coming from the player whose turn it is, then change the state of the game
    if (game.playerIds.indexOf(client.id) === game.turn) {
      game.board[move.y][move.x] = game.playerIds.indexOf(client.id) === 0 ? 1 : -1;
      game.turn = (game.turn + 1) % 2;
    };

    // tell everyone the new board state
    io.emit("move-made", game.board);
  });

  client.on("disconnect", () => {
    console.log("disconnected");
  });
});
 
app.use(express.json());
app.use(cors());
 
server.listen(PORT)