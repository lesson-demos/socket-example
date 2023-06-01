import React, {
  createContext,
  useState,
  useEffect,
} from "react";
import { io } from "socket.io-client";

const DefaultGameState = {
  board: [[0,0,0],[0,0,0],[0,0,0]],
  makeMove: () => {}
}

export const GameContext = createContext(DefaultGameState);

export const GameProvider = ({ children }) => {
  const [board, setBoard] = useState([
    [0,0,0],
    [0,0,0],
    [0,0,0]
  ]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketClient = io("http://localhost:4010");

    socketClient.on("connect", () => {
      
    });

    socketClient.on("disconnect", () => {
      console.log("disconnected");
    });

    socketClient.on("move-made", (board) => {
      setBoard(board);
    });

    setSocket(socketClient);
  }, []);

  const makeMove = (move) => {
    if (socket) {
      socket.emit("make-move", { move });
    }
  }  

  const values = {
    board,
    makeMove,
  };

  return (
    <GameContext.Provider value={values}>
      {children}
    </GameContext.Provider>
  )
};