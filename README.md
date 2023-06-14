# socket.ge

socket.ge is a lightweight Node.js library that provides a simplified interface for building TCP server and client applications. It simplifies the process of handling socket connections, emitting events, and managing data transmission over TCP.

## Features

- Easy-to-use API for creating TCP server and client instances.
- Event-driven architecture for handling socket events and data transmission.
- Support for emitting events and sending data between server and client.
- Room-based broadcasting to send data to multiple clients in a specific room.

## Installation

```shell
npm install socket.ge
```

## Usage

### Server

```javascript
import { Server } from "socket.ge";

const server = new Server(3000);

server.on("connection", (socket) => {
  // Handle socket connection event
  socket.on("data", (data) => {
    // Handle data received from the client
    console.log("Received data:", data);
  });

  socket.on("disconnect", () => {
    // Handle socket disconnection event
    console.log("Socket disconnected");
  });
});
```

### Client

```javascript
import { Io } from "socket.ge";

const client = new Io(3000);

client.createConnection(() => {
  // Connection successful, perform further operations
  client.emit("event", "Hello, server!");
});

client.on("data", (data) => {
  // Handle data received from the server
  console.log("Received data:", data);
});

client.on("disconnect", () => {
  // Handle client disconnection event
  console.log("Client disconnected");
});
```

## API

### Server

#### `new Server(port: number)`

- Creates a TCP server instance listening on the specified `port`.

#### `on(event: string, callback: (socket: SocketInstance) => void)`

- Registers a listener for the specified `event` ("connection", "disconnect").
- The `callback` function is invoked when the event occurs and is passed the `SocketInstance` object representing the connected socket.

### Client

#### `new Io(port: number)`

- Creates a client instance to connect to a TCP server running on the specified `port`.

#### `createConnection(callback: () => void): Client`

- Initiates the connection to the server.
- The `callback` function is invoked when the connection is successfully established.

#### `on(event: string, callback: (data: any) => void): boolean`

- Registers a listener for the specified `event` ("data", "disconnect").
- The `callback` function is invoked when the event occurs and is passed the received `data`.

#### `emit(eventName: string, data: any)`

- Emits an `eventName` event to the server with the provided `data`.

#### `close()`

- Closes the client connection.

## Contributing

Contributions are welcome! Please feel free to submit any bug reports, feature requests, or pull requests on the [GitHub repository](https://github.com/your-repository).

## License

socket.ge is [MIT licensed](https://github.com/your-repository/blob/main/LICENSE).
