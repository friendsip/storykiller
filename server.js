const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const uuid = require('uuid');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const games = {}; // This object holds the state of all games

// Function to generate unique phrases for each player
const generatePhrases = (numPlayers) => {
  // Replace this with your own phrase generation logic
  return Array.from({ length: numPlayers }, () => uuid.v4());
};

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('createGame', (data) => {
    const gameId = "game_" + Math.random().toString(36).substr(2, 9); // Unique game ID
    const numPlayers = data.numPlayers;

    games[gameId] = {
      players: [],
      numPlayers,
      phrases: [],
      storyKiller: null,
      currentRound: 1,
      isActive: true,
    };

    socket.emit('requestPlayerNames', { gameId });
  });

  socket.on('providePlayerNames', (data) => {
    const { gameId, playerNames } = data;
    const game = games[gameId];

    if (game && game.players.length === 0) {
      const phrases = generatePhrases(game.numPlayers);
      const storyKillerIndex = Math.floor(Math.random() * game.numPlayers);

      game.players = playerNames.map((name, index) => ({
        id: uuid.v4(),
        name,
        phrase: phrases[index],
        isStoryKiller: index === storyKillerIndex,
      }));

      game.phrases = phrases;
      game.storyKiller = game.players[storyKillerIndex];

      const playerUrls = game.players.map((player) => ({
        name: player.name,
        url: `/${gameId}/${player.id}`,
      }));

      socket.emit('gameCreated', { gameId, playerUrls });
    }
  });

  socket.on('joinGame', (data) => {
    const { gameId, playerId } = data;
    const game = games[gameId];

    if (game) {
      const player = game.players.find((p) => p.id === playerId);

      if (player) {
        socket.join(gameId);

        const storyKillerData = player.isStoryKiller
          ? {
              isStoryKiller: true,
              targetName: game.players.find((p) => p.phrase === player.phrase && p.id !== player.id).name,
              targetPhrase: player.phrase,
            }
          : { isStoryKiller: false };

        socket.emit('playerJoined', { playerName: player.name, phrase: player.phrase, ...storyKillerData });
      }
    }
  });

  // ... (keep the rest of the event handlers unchanged)

});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});