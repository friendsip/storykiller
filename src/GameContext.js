// src/GameContext.js
import React, { createContext, useContext, useState } from "react";

const GameContext = createContext();

export const useGameContext = () => useContext(GameContext);

export function GameStateProvider({ children }) {
  const [players, setPlayers] = useState([]);
  const [storykiller, setStorykiller] = useState(null);
  const [round, setRound] = useState(1);
  const [currentVictim, setCurrentVictim] = useState(null);

  const addPlayer = (player) =>
    setPlayers((prev) => [...prev, player]);

  const startGame = () => {
    // Randomly select the storykiller
    const storykillerIndex = Math.floor(Math.random() * players.length);
    setStorykiller(players[storykillerIndex].name);

    // Prepare the next round
    prepareNextRound();
  };

  const prepareNextRound = () => {
    // Select a new victim for the storykiller
    const alivePlayers = players.filter((player) => player.isAlive);
    const victimCandidates = alivePlayers.filter(
      (player) => player.name !== storykiller
    );
    const randomVictimIndex = Math.floor(
      Math.random() * victimCandidates.length
    );
    setCurrentVictim(victimCandidates[randomVictimIndex].name);
  };

  const killVictim = () => {
    setPlayers((prev) =>
      prev.map((player) =>
        player.name === currentVictim ? { ...player, isAlive: false } : player
      )
    );
  };

  const voteStorykiller = (suspectedKiller) => {
    if (suspectedKiller === storykiller) {
      // Storykiller is caught, game over
      alert("Storykiller caught! Game over.");
      resetGame();
    } else {
      // Proceed to the next round
      alert("Wrong accusation! Proceeding to the next round.");
      killVictim();
      setRound((prev) => prev + 1);
      if (players.filter(p => p.isAlive).length === 1 || players.filter(p => p.isAlive).length === 0) {
        alert("The storykiller has won!");
        resetGame();
      } else {
        prepareNextRound();
      }
    }
  };

  const resetGame = () => {
    setPlayers([]);
    setStorykiller(null);
    setRound(1);
    setCurrentVictim(null);
  };

  return (
    <GameContext.Provider
      value={{
        players,
        addPlayer,
        storykiller,
        startGame,
        voteStorykiller,
        currentVictim,
        resetGame,
        round,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}