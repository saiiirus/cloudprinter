const WebSocket = require("ws");
const http = require("http");
const net = require("net");

const server = http.createServer();
const wss = new WebSocket.Server({ server });

// Printer IP and port (replace with your printer's IP)
const PRINTER_IP = "192.168.10.172"; // Replace with your printer's IP
const PRINTER_PORT = 9100; // Replace with your printer's port

wss.on("connection", (ws) => {
  console.log("Client connected");

  ws.on("message", (message) => {
    console.log("Received print command: ", message);

    // Connect to the printer via TCP/IP and send the print data
    const client = new net.Socket();
    client.connect(PRINTER_PORT, PRINTER_IP, () => {
      console.log("Connected to printer");
      client.write(message); // Send the print data to the printer
      client.end(); // Close the connection after sending the data
    });

    client.on("error", (err) => {
      console.error("Printer connection error: ", err);
      ws.send("Printer connection failed");
    });

    client.on("close", () => {
      console.log("Connection to printer closed");
      ws.send("Print job sent successfully");
    });
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

// Start the WebSocket server on port 8080
server.listen(8080, () => {
  console.log("WebSocket server is running on ws://180.232.37.26:8080");
});
