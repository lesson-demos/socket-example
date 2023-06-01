import React, { useContext } from "react";
import { GameContext } from "./context/BoardContext";

export default function Board() {
  const { board, makeMove } = useContext(GameContext);

  return (
    <div>
      {board.map((row, i) => (
        <div key={`row-${i}`}>
          {row.map((XorO, j) => (
            <Cell
              key={`col-${j}`}
              XorO={XorO}
              placeXorO={() => makeMove({ y: i, x: j })}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

function Cell({ XorO, placeXorO }) {
  return (
    <button onClick={placeXorO}>
      {XorO > 0 ? "X" : XorO < 0 ? "O" : "_"}
    </button>
  );
}
