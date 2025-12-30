import WebSocket from "ws";

const ws = new WebSocket("wss://websocketbots-production-76f0.up.railway.app");

ws.on("open", () => console.log("Connected!"));
ws.on("message", msg => console.log("Message:", msg.toString()));
ws.on("error", err => console.log("Error:", err));
