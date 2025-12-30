import WebSocket from "ws";

// ===== Server: Accept local clients =====
const localServer = new WebSocket.Server({ port: 8081 });

console.log("Local WebSocket server running on ws://localhost:8081");

// ===== External client: Connect to Railway WebSocket =====
const external = new WebSocket("wss://websocketbots-production-76f0.up.railway.app");

external.on("open", () => console.log("Connected to Railway WebSocket!"));

external.on("message", (msg) => {
  console.log("Message from Railway:", msg.toString());

  // Forward to all connected local clients
  localServer.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(msg.toString());
    }
  });
});

external.on("error", (err) => console.error("External WebSocket error:", err));
external.on("close", () => console.log("Disconnected from Railway WebSocket"));

// ===== Handle messages from local clients =====
localServer.on("connection", (clientSocket) => {
  console.log("Local client connected");

  clientSocket.on("message", (msg) => {
    console.log("Message from local client:", msg.toString());

    // Forward to Railway WebSocket
    if (external.readyState === WebSocket.OPEN) {
      external.send(msg.toString());
    }
  });

  clientSocket.on("close", () => console.log("Local client disconnected"));
});
