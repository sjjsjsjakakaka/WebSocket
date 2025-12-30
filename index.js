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
ws.on("message", (msg) => {
  try {
    const parsedMsg = JSON.parse(msg);
    console.log("JSON:", parsedMsg);
  } catch {
    console.log("Raw message:", msg.toString());
  }
});


  // Respond immediately
  ws.send("Welcome, client!");
  // Handle client disconnection
  ws.on('close', () => {
    console.log("Client disconnected");
  });

  // Handle errors
  ws.on('error', (err) => {
    console.error("WebSocket error:", err);
  });
});
