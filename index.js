const WebSocket = require("ws");

// Server (accept clients)
let server = new WebSocket.Server({ port: 8081 });
server.on("connection", (clientSocket) => {
  console.log("Client connected");

  clientSocket.on("message", (msg) => {
    console.log("Client says:", msg.toString());
    clientSocket.send("Hello client!");
  });
});

// Client (connect to Railway or moomoo.io)
const external = new WebSocket("wss://websocketbots-production-76f0.up.railway.app");

external.on("open", () => console.log("Connected to external server!"));
external.on("message", (msg) => console.log("External message:", msg.toString()));
external.on("error", (err) => console.error(err));
