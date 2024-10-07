const WebSocket = require("ws");
const net = require("net");

// Cloud WebSocket server details
const CLOUD_WS_URL = "ws://180.232.37.26:8080";

// Printer details
const PRINTER_IP = "192.168.10.172";
const PRINTER_PORT = 9100;

// Connect to cloud WebSocket server
const ws = new WebSocket(CLOUD_WS_URL);
const testPrintData = "Hello Printer!";

ws.on("open", () => {
  console.log("Connected to cloud WebSocket server");
});

ws.on("message", (data) => {
  console.log("Received print job from cloud:", data); // Log received data
  if (data) {
    console.log("Data to send to printer:", data); // Ensure data is logged before sending
    sendToPrinter(data);
  } else {
    console.log("No data received from WebSocket");
  }
});

ws.on("close", () => {
  console.log("Disconnected from cloud WebSocket server");
});

ws.on("error", (error) => {
  console.error("WebSocket error:", error);
});

// Function to send data to the printer
function sendToPrinter(printData) {
  const client = new net.Socket();
  client.connect(PRINTER_PORT, PRINTER_IP, () => {
    console.log("**********Connected to printer");
    client.write(printData.toString());
    client.end();
  });

  client.on("error", (err) => {
    console.error("**************Printer connection error:", err);
  });

  client.on("close", () => {
    console.log("*****************Connection to printer closed");
  });
}
