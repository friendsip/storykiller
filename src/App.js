import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PlayerSetup from './PlayerSetup';
import PlayerSignIn from './PlayerSignIn';
import StoryRound from './StoryRound';

const App = () => {
  const [players, setPlayers] = useState([]);
  const [storyKiller, setStoryKiller] = useState(null);
  const [round, setRound] = useState(1);

  return (
    <Router>
      <Routes>
        <Route path="/" element={players.length === 0 ? (
          <PlayerSetup setPlayers={setPlayers} setStoryKiller={setStoryKiller} />
        ) : (
          <StoryRound 
            players={players} 
            round={round} 
            setRound={setRound} 
            storyKiller={storyKiller} 
          />
        )} />
        <Route path="/join/:id" element={<PlayerSignIn players={players} setPlayers={setPlayers} />} />
      </Routes>
    </Router>
  );
}

export default App;
