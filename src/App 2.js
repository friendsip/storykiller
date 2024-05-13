// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import GameSetup from './components/GameSetup';
import Game from './components/Game';
import { GameStateProvider } from './GameContext';

function App() {
  return (
    <Router>
      <GameStateProvider>
        <div className="App">
          <Switch>
            <Route path="/setup">
              <GameSetup />
            </Route>
            <Route path="/game">
              <Game />
            </Route>
            <Route path="/">
              <h1>Welcome to the Storytelling Game</h1>
              <p><a href="/setup">Start Game Setup</a></p>
            </Route>
          </Switch>
        </div>
      </GameStateProvider>
    </Router>
  );
}

export default App;