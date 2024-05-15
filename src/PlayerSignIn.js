import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const PlayerSignIn = ({ players, setPlayers }) => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const player = players.find(player => player.id === id);

  if (!player) {
    return <div>Invalid link</div>;
  }

  const handleSignIn = () => {
    setPlayers(players.map(p => p.id === id ? { ...p, name } : p));
    navigate('/');
  };

  return (
    <div>
      <h1>Sign In</h1>
      <p>Your phrase: {player.phrase}</p>
      <input 
        type="text" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        placeholder="Your name" 
      />
      <button onClick={handleSignIn}>Submit</button>
    </div>
  );
};

export default PlayerSignIn;
