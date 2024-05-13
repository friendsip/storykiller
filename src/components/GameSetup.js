// src/components/GameSetup.js
import React, { useState } from "react";
import { useGameContext } from "../GameContext";
import { phrases } from "../api/phrases";
import { useNavigate } from 'react-router-dom';

function GameSetup() {
  const { addPlayer, players } = useGameContext();
  const [playerName, setPlayerName] = useState("");
  const navigate = useNavigate();

  const handleAddPlayer = () => {
    if (players.length >= 6) {
      alert("Maximum of 6 players reached");
      return;
    }

    const availablePhrases = phrases.filter(
      (phrase) => !players.some((p) => p.phrase === phrase)
    );

    if (availablePhrases.length === 0) {
      alert("No more unique phrases available");
      return;
    }

    const randomPhrase = availablePhrases[Math.floor(Math.random() * availablePhrases.length)];
    addPlayer({ name: playerName, phrase: randomPhrase, isAlive: true });
    setPlayerName("");

    // Navigate to the game view if maximum players are reached
    if (players.length === 5) {
      navigate('/game');
    }
  };

  return (
    <div>
      <h2>Game Setup</h2>
      <input
        type="text"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
        placeholder="Enter player name"
        className="text-input"
      />
      <button onClick={handleAddPlayer} disabled={playerName.trim() === ""}>
        Add Player
      </button>
      <ul>
        {players.map((player, index) => (
          <li key={index}>
            {player.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GameSetup;