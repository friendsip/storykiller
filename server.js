const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const games = {}; // This object holds the state of all games

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('createGame', (data) => {
    const gameId = "game_" + Math.random().toString(36).substr(2, 9); // Unique game ID
    games[gameId] = {
      players: [],
      phrases: [],
      storyKiller: null,
      currentRound: 1,
      isActive: true,
    };
    socket.join(gameId);
    socket.emit('gameCreated', gameId);
  });

  socket.on('joinGame', (data) => {
    const { gameId, playerName } = data;
    if (games[gameId]) {
      games[gameId].players.push({ playerName, id: socket.id });
      socket.join(gameId);
      io.to(gameId).emit('playerJoined', { playerName });
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
    // Handle player disconnection
  });
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});
