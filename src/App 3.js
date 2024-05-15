// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import GameSetup from "./components/GameSetup";
import Game from "./components/Game";
import { GameStateProvider } from "./GameContext";

function App() {
  return (
    <GameStateProvider>
      <Router>
        <Routes>
          <Route path="/setup" element={<GameSetup />} />
          <Route path="/game" element={<Game />} />
          <Route
            path="/"
            element={
              <div>
                <h1>Welcome to the Storytelling Game</h1>
                <Link to="/setup">Start Game Setup</Link>
              </div>
            }
          />
        </Routes>
      </Router>
    </GameStateProvider>
  );
}

export default App;