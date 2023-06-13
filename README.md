README.md

# Socket.ge

Socket.ge is a lightweight library for creating server-side socket connections in Node.js. It provides an intuitive and straightforward API for handling socket events, managing client connections, and facilitating communication between clients.

## Installation

To install Socket.ge, use npm:

```
npm install socket.ge
```

## Usage

Here's an example of how to use Socket.ge to create a server and handle socket events:

```typescript
import { Server } from "socket.ge";

const io = new Server(3000);

io.on("connection", (socket) => {
  console.log("Client connected");

  socket.on("message", (data) => {
    console.log("Received message:", data);
    console.log("User ID on server:", socket.id);
  });

  socket.on("join", (data) => {
    console.log("Listening for join:", data);
    socket.join(data["room"]);
  });

  socket.on("chatting", (data) => {
    console.log("Received chat:", data);

    socket.emit("listened", "Hello, my friend from the server");
  });

  socket.onDisconnect(() => {
    console.log("Client disconnected");
  });

  socket.on("writeToRoom", (data) => {
    socket.emitToRoom("chat1", "sent check", data["message"]);
  });
});
```

Socket.ge provides a `Server` class that creates a server instance to handle socket connections. You can listen for the `"connection"` event to receive a `socket` object representing the connected client. The `socket` object provides methods such as `on`, `emit`, `close`, `onDisconnect`, `join`, and `emitToRoom` to handle various socket operations.

Please refer to the API documentation below for detailed information on each method and event.

## API Documentation

### Server

#### `on(connection: "connection", cb: (socket: SocketInterface) => void): void`

- Listens for the `"connection"` event and invokes the provided callback function when a client connects.
- The `socket` object passed to the callback implements the `SocketInterface` interface.

### Socket

#### `id: number`

- The ID of the socket (assigned by the server).

#### `on(listener: string, def: (...args: any[]) => void): boolean`

- Registers a listener function for a specific event.
- The `listener` parameter is the name of the event to listen for.
- The `def` parameter is the callback function to be invoked when the event occurs.

#### `emit(event: string, data: any): boolean`

- Emits an event with the associated data to the connected client.
- The `event` parameter is the name of the event to emit.
- The `data` parameter is the data to be sent along with the event.

#### `close(): boolean`

- Closes the socket connection.

#### `onDisconnect(cb: (data: boolean) => void)`

- Registers a callback function to be invoked when the client disconnects.

#### `join(roomName: string)`

- Joins the specified room.

#### `emitToRoom(roomName: string, event: string, data: any): this`

- Emits an event with the associated data to all clients in the specified room.
- The `roomName` parameter is the name of the room to emit the event to.
- The `event` parameter is the name of the event to emit.
- The `data` parameter is the data to be sent along with the event.

### Clients

#### `addConnection(number: number, socket: net.Socket): void`

- Adds a client connection to the internal connections map.
- The `number` parameter is the assigned number of the

client.

- The `socket` parameter is the corresponding `net.Socket` object representing the client connection.

#### `removeConnection(number: number): void`

- Removes a client connection from the internal connections map.
- The `number` parameter is the number of the client connection to remove.

#### `removeUserFromRoomEveryRoom(userId: number)`

- Removes the specified user from all rooms.

#### `getUsersByRoomName(roomName: string): Array<number>`

- Retrieves an array of user IDs in the specified room.

#### `createRoom(roomName: string)`

- Creates a new room with the specified name.

#### `addUserToRoom(roomName: string, user: number)`

- Adds a user to the specified room.
- If the room doesn't exist, it will be created automatically.

#### `addUsersToRoom(roomName: string, users: Array<number>)`

- Adds multiple users to the specified room.
- If the room doesn't exist, it will be created automatically.

## License

Socket.ge is released under the [MIT License](https://opensource.org/licenses/MIT).
