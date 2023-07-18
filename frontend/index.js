import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import { GameStateContextProvider } from "./gameStateContext.jsx";

ReactDOM.render(
  <GameStateContextProvider>
    <App />
  </GameStateContextProvider>
, document.getElementById("root"));
