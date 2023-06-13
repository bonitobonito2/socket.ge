# socket.ge

`socket.ge` is a JavaScript library that provides a simplified and efficient way to work with TCP socket connections in Node.js. It abstracts the underlying TCP functionalities and provides a clean interface for managing client connections and facilitating communication between the server and connected clients.

## Features

- Establish TCP server and handle incoming client connections.
- Manage client connections and assign unique identifiers to each client.
- Emit events and exchange data between the server and clients.
- Create rooms and group clients based on specific criteria.
- Handle disconnections and clean up resources.

## Installation

To install `socket.ge` library, use the following command:

```
npm install socket.ge
```

## Usage

### Server

```javascript
import { Server } from "socket.ge";

// Create a server instance
const server = new Server(8080);

// Handle connection events
server.on("connection", (socket) => {
  // Handle socket events
  socket.on("data", (data) => {
    console.log("Received data:", data);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// Start the server
server.listen();
```

### Client

```javascript
import net from "net";

// Create a client socket
const socket = new net.Socket();

// Connect to the server
socket.connect(8080, "localhost", () => {
  console.log("Connected to server");

  // Send data to the server
  socket.write("Hello, server!");
});

// Handle data received from the server
socket.on("data", (data) => {
  console.log("Received data from server:", data);
});

// Handle disconnection
socket.on("close", () => {
  console.log("Disconnected from server");
});
```

## Documentation

For detailed documentation and examples, please refer to the [socket.ge documentation](https://socket.ge/docs).

## License

`socket.ge` library is licensed under the MIT License.
