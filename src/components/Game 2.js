// src/components/Game.js
import React, { useState, useEffect } from 'react';
import { useGameContext } from '../GameContext';

function Game() {
  const { players, killer, phrases, currentRound, nextRound } = useGameContext();
  const [votes, setVotes] = useState({});
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  useEffect(() => {
    if (Object.keys(votes).length === players.filter(p => p.isAlive).length) {
      let voteCounts = players.reduce((acc, player) => {
        acc[player.name] = (acc[player.name] || 0) + (votes[player.name] || 0);
        return acc;
      }, {});

      let maxVotes = Math.max(...Object.values(voteCounts));
      let potentialKillers = Object.keys(voteCounts).filter(name => voteCounts[name] === maxVotes);

      // Randomly decide if there's a tie
      let chosenKiller = potentialKillers[Math.floor(Math.random() * potentialKillers.length)];

      if (chosenKiller === killer.name) {
        alert(`The storytellers win! They found the killer: ${killer.name}`);
      } else {
        nextRound();
        alert(`Wrong guess! ${chosenKiller} was not the killer.`);
      }
    }
  }, [votes, players, killer, nextRound]);

  const voteForPlayer = (player) => {
    setVotes({ ...votes, [player.name]: (votes[player.name] || 0) + 1 });
    setSelectedPlayer(player.name);
  };

  return (
    <div>
      <h3>Round {currentRound}</h3>
      <div>
        {players.map((player, index) => (
          <div key={index} onClick={() => voteForPlayer(player)} style={{ cursor: 'pointer', opacity: player.isAlive ? 1 : 0.4 }}>
            {player.name} {selectedPlayer === player.name ? '(selected)' : ''}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Game;