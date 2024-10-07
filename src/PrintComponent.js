import React, { useEffect, useState } from "react";

const PrintComponent = () => {
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const socket = new WebSocket("ws://180.232.37.26:8080");
    setWs(socket);

    socket.onopen = () => {
      console.log("Connected to WebSocket server");
      console.log("WebSocket state:", socket.readyState);
    };

    socket.onmessage = (event) => {
      console.log("Message from server: ", event.data);
    };

    socket.onclose = () => {
      console.log("Disconnected from WebSocket server");
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, []);

  const handlePrint = () => {
    if (ws) {
      const printData = "Print this receipt"; // Customize this with your print data
      console.log("Sending to WebSocket server:", printData); // Add this line
      ws.send(printData);
    }
  };

  return (
    <div>
      <button onClick={handlePrint}>Print Receipt</button>
    </div>
  );
};

export default PrintComponent;
