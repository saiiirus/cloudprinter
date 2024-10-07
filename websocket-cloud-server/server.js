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

  // Handle messages from the client
  ws.on("message", (message) => {
    console.log("Received message:", message);
    // Forward the message to the printer or any other logic
    // You can send the data back to connected clients if needed
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });

  ws.on("error", (error) => {
    console.error("WebSocket error:", error);
  });
});
