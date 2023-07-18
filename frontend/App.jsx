import React, { useEffect, useState, useContext } from "react";
import { gameStateContext } from "./gameStateContext";

export default function App() {
  const {
    gameState,
    emitNewGameState,
  } = useContext(gameStateContext)
  const [board, setBoard] = useState([]);

  useEffect(() => {
    setBoard(gameState.board);
  }, [gameState]);

  const submitMove = (i, j) => () => {
    const newBoard = board.map(row => row.slice());
    if (newBoard[i][j]) return; // don't allow moves where the cell has already been taken
    newBoard[i][j] = gameState.turnIndex % 2 ? -1 : 1;
    emitNewGameState({
      board: newBoard,
      turnIndex: gameState.turnIndex + 1,
    });
  }

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {board?.map((row, i) => (
        <div key={i} style={{ display: "flex" }}>
          {row.map((cell, j) => (
            <button onClick={submitMove(i, j)} key={`${i}, ${j}`}>
              {cell < 0 ? "O" : cell > 0 ? "X" : "_"}
            </button>)
          )}
        </div>
      ))}
    </div>
  )
}
