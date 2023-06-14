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

  /**
   * Creates a new SocketInstance.
   *
   * @param socket - The net.Socket instance representing the socket connection.
   * @param client - The Clients instance for managing connected clients.
   */
  constructor(socket: net.Socket, client: Clients) {
    this.socket = socket;
    this.clients = client;
    this.parse = new Parse();
    this.handlers = new Map();
    this.id = socket.remotePort;
    this.listenData();
    this.handleDisconnect();
  }

  /**
   * Register a listener function for a specific event.
   *
   * @param listener - The name of the event to listen for.
   * @param def - The listener function to be invoked when the event occurs.
   * @returns True if the listener is successfully registered.
   */
  public on(listener: string, def: (...args: any[]) => void): boolean {
    this.handlers.set(listener, def);

    return true;
  }

  /**
   * Emit an event with associated data to the connected client.
   *
   * @param event - The name of the event to emit.
   * @param data - The data to be sent along with the event.
   * @returns True if the event is successfully emitted.
   */
  public emit(event: string, data: any): boolean {
    this.socket.write(JSON.stringify({ path: event, data, end: true }));
    return true;
  }

  /**
   * Emit an event with associated data to all clients in a specific room.
   *
   * @param roomName - The name of the room.
   * @param event - The name of the event to emit.
   * @param data - The data to be sent along with the event.
   * @returns The current SocketInstance object.
   */
  public emitToRoom(roomName: string, event: string, data: any): this {
    const connections = this.clients.getUsersByRoomName(roomName);
    connections.forEach((userId) => {
      this.clients.connections
        .get(userId)
        .write(JSON.stringify({ path: event, data, end: true }));
    });

    return this;
  }

  /**
   * Listen for data events on the socket and handle incoming data.
   * Automatically called when the socket receives data.
   */
  private listenData() {
    this.socket.on("data", (data) => {
      this.buffer += data.toString();
      this.handleRequest();
    });
  }

  /**
   * Handle the socket disconnection event.
   * Automatically called when the socket is closed.
   */
  private handleDisconnect() {
    this.socket.on("close", () => {
      try {
        this.clients.removeConnection(this.socket.remotePort);
        this.clients.removeUserFromRoomEveryRoom(this.id);
      } catch (err) {
        console.log(err);
      }
    });
  }

  /**
   * Register a callback function to be invoked when the socket is closed.
   *
   * @param cb - The callback function to be invoked with the disconnection status.
   */
  public onDisconnect(cb: (data: boolean) => void) {
    this.socket.on("close", (data: boolean) => {
      cb(data);
    });
  }

  /**
   * Add the socket connection to the specified room.
   *
   * @param roomName - The name of the room to join.
   */
  public join(roomName: string) {
    this.clients.addUserToRoom(roomName, this.id);
  }

  /**
   * Handle the incoming data by parsing it and calling the associated handler function.
   * Automatically called when the buffer contains a complete data object.
   */
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

  /**
   * Close the socket connection.
   *
   * @returns True if the socket is successfully closed.
   */
  public close(): boolean {
    this.socket.destroy();
    return true;
  }
}
