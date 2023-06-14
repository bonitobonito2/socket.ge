import net from "net";
import { SocketInterface } from "./interfaces/socket.interface";
import { Parse } from "../parser/parse";
import { Clients } from "./clients";

export class SocketInstance implements SocketInterface {
  private socket: net.Socket;
  private buffer: string = "";
  private handlers: Map<string, (...args: any[]) => void>;
  private readonly parse: Parse;
  private clients: Clients;
  public readonly id: number;

  constructor(socket: net.Socket, client: Clients) {
    this.socket = socket;
    this.clients = client;
    this.parse = new Parse();
    this.handlers = new Map();
    this.id = socket.remotePort;
    this.listenData();
    this.handleDiscconect();
  }

  // Register a listener function for a specific event
  public on(listener: string, def: (...args) => void): boolean {
    this.handlers.set(listener, def);

    return true;
  }

  // Emit an event with associated data
  public emit(event: string, data: any): boolean {
    this.socket.write(JSON.stringify({ path: event, data, end: true }));
    return true;
  }

  public emitToRoom(roomName: string, event: string, data: any): this {
    const connections = this.clients.getUsersByRoomName(roomName);
    connections.forEach((userId) => {
      this.clients.connections
        .get(userId)
        .write(JSON.stringify({ path: event, data, end: true }));
    });

    return this;
  }

  // Listen for data events on the socket
  private listenData() {
    this.socket.on("data", (data) => {
      this.buffer += data.toString();
      this.handleRequest();
    });
  }

  private handleDiscconect() {
    this.socket.on("close", () => {
      try {
        this.clients.removeConnection(this.socket.remotePort);
        this.clients.removeUserFromRoomEveryRoom(this.id);
      } catch (err) {
        console.log(err);
      }
    });
  }
  public onDisconnect(cb: (data: boolean) => void) {
    this.socket.on("close", (data: boolean) => {
      cb(data);
    });
  }

  public join(roomName: string) {
    this.clients.addUserToRoom(roomName, this.id);
  }

  // Handle the incoming data by parsing it and calling the associated handler function
  private handleRequest() {
    while (this.buffer.includes('"end":true}')) {
      // Parse the incoming data from the buffer and return it as an object
      const data = this.parse.parseIncomingData(this.buffer);

      //Taking new buffer to counter a while loop.
      this.buffer = data[1];

      try {
        //Taking a request to handle it.
        this.handlers.get(data[0]["path"])(data[0]["data"]);
      } catch (error) {}
    }
  }

  public close(): boolean {
    this.socket.destroy();
    return true;
  }
}
