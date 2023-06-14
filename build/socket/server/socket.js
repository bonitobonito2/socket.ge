"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketInstance = void 0;
const parse_1 = require("../../parser/parse");
class SocketInstance {
  constructor(socket, client) {
    this.buffer = "";
    this.socket = socket;
    this.clients = client;
    this.parse = new parse_1.Parse();
    this.handlers = new Map();
    this.id = socket.remotePort;
    this.listenData();
  }
  // Register a listener function for a specific event
  on(listener, def) {
    this.handlers.set(listener, def);
    return true;
  }
  // Emit an event with associated data
  emit(event, data) {
    this.socket.write(JSON.stringify({ event, data, end: true }));
    return true;
  }
  emitToRoom(roomName, event, data) {
    const connections = this.clients.getUsersByRoomName(roomName);
    connections.forEach((userId) => {
      this.clients.connections
        .get(userId)
        .write(JSON.stringify({ event, data, end: true }));
    });
    return this;
  }
  // Listen for data events on the socket
  listenData() {
    this.socket.on("data", (data) => {
      this.buffer += data.toString();
      this.handleRequest();
    });
  }
  onDisconnect(cb) {
    this.socket.on("close", (data) => {
      try {
        this.clients.removeConnection(this.socket.remotePort);
        this.clients.removeUserFromRoomEveryRoom(this.id);
        cb(data);
      } catch (err) {
        cb(false);
      }
    });
  }
  join(roomName) {
    this.clients.addUserToRoom(roomName, this.id);
    console.log(this.clients.rooms);
  }
  // Handle the incoming data by parsing it and calling the associated handler function
  handleRequest() {
    while (this.buffer.includes('"end":true}')) {
      // Parse the incoming data from the buffer and return it as an object
      const data = this.parse.parseIncomingData(this.buffer);
      //Taking new buffer to counter a while loop.
      this.buffer = data[1];
      try {
        //Taking a request to handle it.
        this.handlers.get(data[0]["path"])(data[0]["data"]);
      } catch (error) {
        console.log("not registered handlers");
      }
    }
  }
  close() {
    this.socket.destroy();
    return true;
  }
}
exports.SocketInstance = SocketInstance;
