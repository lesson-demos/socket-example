import React from "react";
import Board from "./Board";
import { GameProvider } from "./context/BoardContext";

export default function App() {
  return (
    <GameProvider>
      <Board></Board>
    </GameProvider>
  );
}
