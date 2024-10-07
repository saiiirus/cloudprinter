const WebSocket = require("ws");
const express = require("express");
const app = express();

// Start the HTTP server and listen on port 8080
const server = app.listen(8080, "0.0.0.0", () => {
  console.log("WebSocket server running on port 8080");
});

// Create a WebSocket server
const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
  console.log("Client connected to WebSocket server");

  // Simulate sending a message to the client
  setTimeout(() => {
    ws.send("Test print data from server");
  }, 3000); // Send after 3 seconds

  ws.on("message", (message) => {
    console.log("Received message:", message);
    ws.send(message);    
  });
});
