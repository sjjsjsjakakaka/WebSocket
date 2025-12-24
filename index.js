const WebSocket = require('ws');

const PORT = process.env.PORT || 3000;

const server = new WebSocket.Server({ port: PORT }, () => {
    console.log(`WebSocket server running on port ${PORT}`);
});

server.on('connection', (ws) => {
    console.log('New client connected');

    // Send a welcome message to the client
    ws.send('Welcome to the WebSocket server!');

    // Handle messages from clients
    ws.on('message', (message) => {
        console.log('Received:', message.toString());

        // Echo the message back
        ws.send(`You said: ${message}`);
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});
