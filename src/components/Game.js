// src/components/Game.js
import React, { useState } from "react";
import { useGameContext } from "../GameContext";

function Game() {
  const {
    players,
    storykiller,
    startGame,
    voteStorykiller,
    currentVictim,
    resetGame,
  } = useGameContext();
  const [suspectedKiller, setSuspectedKiller] = useState("");

  const handleVote = () => {
    if (!suspectedKiller) return;
    voteStorykiller(suspectedKiller);
    setSuspectedKiller("");
  };

  return (
    <div>
      <h2>Storytelling Game</h2>
      {storykiller ? (
        <>
          <p>The storykiller is among us, and {currentVictim} has been found dead!</p>
          <h3>Vote who you think is the storykiller:</h3>
          <select
            value={suspectedKiller}
            onChange={(e) => setSuspectedKiller(e.target.value)}
          >
            <option value="">Select a player</option>
            {players
              .filter((player) => player.isAlive && player.name !== currentVictim)
              .map((player, index) => (
                <option key={index} value={player.name}>
                  {player.name}
                </option>
              ))}
          </select>
          <button onClick={handleVote}>Vote</button>
        </>
      ) : (
        <>
          <h3>Players:</h3>
          <ul>
            {players.map((player, index) => (
              <li key={index}>
                {player.name} - Phrase: "{player.phrase}" -{" "}
                {player.isAlive ? "Alive" : "Dead"}
              </li>
            ))}
          </ul>
          <button onClick={startGame}>Start Game</button>
          <button onClick={resetGame}>Reset Game</button>
        </>
      )}
    </div>
  );
}

export default Game;