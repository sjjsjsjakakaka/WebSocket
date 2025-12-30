import WebSocket from "ws";

// ===== Server: Accept local clients =====
const server = new WebSocket.Server({ port: 8081 });

server.on("connection", (clientSocket) => {
  console.log("Client connected");

  clientSocket.on("message", (msg) => {
    console.log("Client says:", msg.toString());

    // Optionally forward this message to external WebSocket
    if (external.readyState === WebSocket.OPEN) {
      external.send(msg.toString());
    }
  });
});

// ===== Client: Connect to Railway WebSocket =====
const external = new WebSocket("wss://websocketbots-production-76f0.up.railway.app");

external.on("open", () => console.log("Connected to Railway WebSocket!"));

external.on("message", (msg) => {
  console.log("Message from Railway:", msg.toString());

  // Optionally broadcast to all connected clients
  server.clients.forEach((c) => {
    if (c.readyState === WebSocket.OPEN) {
      c.send(msg.toString());
    }
  });
});

external.on("error", (err) => console.error("External WebSocket error:", err));
external.on("close", () => console.log("Disconnected from Railway WebSocket"));
