// src/components/GameSetup.js
import React, { useState } from 'react';
import { useGameContext } from '../GameContext';
import axios from 'axios';

function GameSetup() {
  const { addPlayer, players, updatePhrases } = useGameContext();
  const [playerName, setPlayerName] = useState('');

  const handleAddPlayer = async () => {
    if (players.length >= 6) {
      alert('Maximum of 6 players reached');
      return;
    }

    const { data } = await axios.get('/api/generatePhrase');
    addPlayer({ name: playerName, phrase: data.phrase, isAlive: true });
    updatePhrases({ ...phrases, [playerName]: data.phrase });
    setPlayerName('');
  };

  return (
    <div>
      <input
        type="text"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
        placeholder="Enter player name"
      />
      <button onClick={handleAddPlayer}>Add Player</button>
      <div>
        {players.map((player, index) => (
          <div key={index}>
            {player.name} - Phrase: {player.phrase}
          </div>
        ))}
      </div>
    </div>
  );
}

export default GameSetup;