import { WebSocketServer } from "ws";

const PORT = 8080; // MUST match Railway target port
const wss = new WebSocketServer({ port: PORT });

wss.on("connection", (ws) => {
  ws.send("connected");

  ws.on("message", (msg) => {
    ws.send(`echo: ${msg}`);
  });
});

console.log("WS running on 8080");
