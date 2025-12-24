const WebSocket = require('ws');
let wsData = {socket: null};

// Use process.env.PORT for Railway deployment
const PORT = process.env.PORT || 3000;

const wss = new WebSocket.Server({ port: PORT }, () => {
  console.log(`WebSocket server running on port ${PORT}`);
});

// Listen for connection events
wss.on('connection', (ws) => {
  console.log("A new client connected!");
  wsData.socket = ws;
  wss.on("message", (msg) => {
    let parsedMsg = JSON.parse(msg);
    console.log(parsedMsg);
  });

  // Respond immediately
  ws.send("Welcome, client!");

  // Listen for messages from client
  ws.on('message', (message) => {
    console.log("Received from client:", message);

    // Echo the message back
    ws.send(`Server received: ${message}`);
  });

  // Handle client disconnection
  ws.on('close', () => {
    console.log("Client disconnected");
  });

  // Handle errors
  ws.on('error', (err) => {
    console.error("WebSocket error:", err);
  });
});
