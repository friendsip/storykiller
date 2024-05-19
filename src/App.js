import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5001'); // Ensure the port matches your backend server

function App() {
    const [playerInfo, setPlayerInfo] = useState(null);
    const [gameId, setGameId] = useState('');
    const [playerName, setPlayerName] = useState('');

    useEffect(() => {
        socket.on('connect', () => {
            console.log('Connected to server');
        });

        socket.on('playerInfo', (info) => {
            setPlayerInfo(info);
        });

        return () => {
            socket.off('connect');
            socket.off('playerInfo');
        };
    }, []);

    const handleJoinGame = () => {
        if (gameId && playerName) {
            socket.emit('joinGame', { gameId, playerName });
        }
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>StoryKiller Game</h1>
                {playerInfo ? (
                    <div>
                        <p>Your phrase: {playerInfo.phrase}</p>
                        <p>{playerInfo.isStoryKiller ? 'You are the StoryKiller' : 'You are a Storyteller'}</p>
                    </div>
                ) : (
                    <div>
                        <input
                            type="text"
                            placeholder="Game ID"
                            value={gameId}
                            onChange={(e) => setGameId(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Your Name"
                            value={playerName}
                            onChange={(e) => setPlayerName(e.target.value)}
                        />
                        <button onClick={handleJoinGame}>Join Game</button>
                    </div>
                )}
            </header>
        </div>
    );
}

export default App;