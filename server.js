io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('joinGame', async ({ gameId, playerName }) => {
        try {
            const game = await Game.findById(gameId);
            if (!game) {
                socket.emit('error', 'Game not found');
                return;
            }
            const player = game.players.find(p => p.name === playerName);
            if (!player) {
                socket.emit('error', 'Player not found');
                return;
            }
            socket.emit('playerInfo', player);
        } catch (err) {
            socket.emit('error', 'An error occurred');
        }
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});