import React, { useEffect, useState, createContext } from "react";
import { io } from "socket.io-client";

const defaultGameStateContextProvider = {
  gameState: {
    turnIndex: 0,
    board: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
    prevPlayersId: null,
  },
  emitNewGameState: () => {},
}

export const gameStateContext = createContext(defaultGameStateContextProvider);

export const GameStateContextProvider = ({children}) => {
  const [socket, setSocket] = useState(null);
  const [gameState, setGameState] = useState({
    turnIndex: 0,
    board: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
    prevPlayersId: null,
  });

  useEffect(() => {
    console.log("here")
    const socketClient = io("http://localhost:4000");

    socketClient.on("connect", () => {
      console.log("connected with id:" + socketClient.id);
    });

    socketClient.on("disconnect", () => {
      console.log("disconnected");
    });

    socketClient.on("newGameState", (newGameState) => {
      setGameState(newGameState);
    });

    setSocket(socketClient);
  }, []);

  const emitNewGameState = (newGameState) => {
    if (gameState.prevPlayersId === socket.id) return; // don't allow moves from the same player twice in a row
    newGameState = { ...newGameState, prevPlayersId: socket.id }
    socket.emit("newGameState", newGameState);
    setGameState(newGameState);
  }

  const value = {
    gameState,
    emitNewGameState,
  }

  return <gameStateContext.Provider value={value}>
    {children}
  </gameStateContext.Provider>
}