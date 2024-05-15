import React, { useState } from 'react';

const StoryRound = ({ players, round, setRound, storyKiller }) => {
  const [votes, setVotes] = useState({});
  const [showVotes, setShowVotes] = useState(false);

  const handleVote = (voter, suspect) => {
    setVotes({
      ...votes,
      [voter]: suspect
    });
  };

  const handleEndRound = () => {
    setShowVotes(true);
    const suspectVotes = Object.values(votes).reduce((acc, suspect) => {
      acc[suspect] = (acc[suspect] || 0) + 1;
      return acc;
    }, {});
    const maxVotes = Math.max(...Object.values(suspectVotes));
    const mostVoted = Object.keys(suspectVotes).find(suspect => suspectVotes[suspect] === maxVotes);

    if (mostVoted === storyKiller.name) {
      alert(`StoryKiller caught! It was ${storyKiller.name}.`);
      // Reset or end game logic here
    } else {
      alert(`${mostVoted} is eliminated. The StoryKiller remains.`);
      // Remove eliminated player
      const updatedPlayers = players.filter(player => player.name !== mostVoted);
      setRound(round + 1);
      // Update StoryKiller's new target and phrase
    }
  };

  return (
    <div>
      <h1>Round {round}</h1>
      {players.map((player, index) => (
        <div key={index}>
          <h2>{player.name}</h2>
          <p>Your phrase: {player.phrase}</p>
          <button onClick={() => handleVote(player.name, prompt('Who do you suspect?'))}>
            Vote
          </button>
        </div>
      ))}
      <button onClick={handleEndRound}>End Round</button>
      {showVotes && (
        <div>
          <h2>Votes</h2>
          <ul>
            {Object.entries(votes).map(([voter, suspect], index) => (
              <li key={index}>{voter} voted for {suspect}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default StoryRound;
