import { WebSocketServer } from "ws";
import http from "http";

const PORT = process.env.PORT || 8080;

// Create HTTP server (Railway requires this)
const server = http.createServer();

// Attach WebSocket server
const wss = new WebSocketServer({ server });

wss.on("connection", (ws, req) => {
  console.log("Client connected:", req.socket.remoteAddress);

  // Send a message when client connects
  ws.send("Hello from Railway WebSocket server!");

  ws.on("message", (message) => {
    console.log("Received:", message.toString());

    // Echo back
    ws.send(`Server received: ${message}`);
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });

  ws.on("error", (err) => {
    console.error("WebSocket error:", err);
  });
});

server.listen(PORT, () => {
  console.log(`WebSocket server running on port ${PORT}`);
});
