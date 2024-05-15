import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const PlayerSetup = ({ setPlayers, setStoryKiller }) => {
  const [numPlayers, setNumPlayers] = useState('');
  const [playerLinks, setPlayerLinks] = useState([]);
  const [isGeneratingLinks, setIsGeneratingLinks] = useState(false);

  const handleGenerateLinks = () => {
    const phrases = generatePhrases(numPlayers);
    const storyKillerIndex = Math.floor(Math.random() * numPlayers);
    const links = [];

    const players = Array.from({ length: numPlayers }, (_, index) => {
      const id = uuidv4();
      const phrase = phrases[index];
      links.push({ id, url: `${window.location.origin}/join/${id}`, phrase });
      return { id, phrase, name: '' };
    });

    setPlayerLinks(links);
    setPlayers(players);
    setStoryKiller({
      id: players[storyKillerIndex].id,
      target: players[(storyKillerIndex + 1) % numPlayers].id,
      targetPhrase: phrases[(storyKillerIndex + 1) % numPlayers]
    });
    setIsGeneratingLinks(true);
  };

  const generatePhrases = (num) => {
    // Replace with actual phrase generation logic
    return Array(num).fill().map(() => 'random phrase');
  };

  return (
    <div>
      <h1>Player Setup</h1>
      {!isGeneratingLinks ? (
        <>
          <input 
            type="number" 
            value={numPlayers} 
            onChange={(e) => setNumPlayers(e.target.value)} 
            placeholder="Number of players" 
          />
          <button onClick={handleGenerateLinks}>Generate Links</button>
        </>
      ) : (
        <ul>
          {playerLinks.map((link, index) => (
            <li key={index}>
              Player {index + 1} link: <a href={link.url} target="_blank" rel="noopener noreferrer">{link.url}</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PlayerSetup;
