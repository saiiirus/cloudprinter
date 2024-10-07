const WebSocket = require("ws");
const net = require("net");

// Cloud WebSocket server details
const CLOUD_WS_URL = "ws://180.232.37.26:8080";

// Printer details
const PRINTER_IP = "192.168.10.172";
const PRINTER_PORT = 9100;

// Connect to cloud WebSocket server
const ws = new WebSocket(CLOUD_WS_URL);

ws.on("open", () => {
  console.log("Connected to cloud WebSocket server");
});

ws.on("error", (error) => {
  console.error("WebSocket error:", error);
});

ws.on("message", (data) => {
  console.log("Received print job from cloud:", data); // Log received buffer

  // Convert buffer to string
  const dataStr = data.toString();  // Convert Buffer to string

  // Ensure we log what exactly is being received
  if (dataStr && dataStr.trim()) {  // Check if string is not empty or just spaces
    console.log("Data to send to printer:", dataStr); // Log valid data before sending
    sendToPrinter(dataStr);  // Send the string to the printer
  } else {
    console.log("Received invalid or empty data, skipping print");
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
  console.log("Sending to printer:", printData); // Log the data being sent
  const client = new net.Socket();

  client.connect(PRINTER_PORT, PRINTER_IP, () => {
    console.log("Connected to printer");
    client.write(printData.toString()); // Ensure we send a string
    client.end(); // Close connection after sending
  });

  client.on("error", (err) => {
    console.error("************* Printer connection error:", err);
  });

  client.on("close", () => {
    console.log("**************************** Connection to printer closed");
  });

  client.on("data", (data) => {
    console.log("************************* Printer response:", data.toString());
  });
}
