import net from "net";
import { SocketInterface } from "./interfaces/socket.interface";
import { Parse } from "../parser/parse";
import { Clients } from "./clients";

export class SocketInstance implements SocketInterface {
  private socket: net.Socket;
  private buffer: string = "";
  private handlers: Map<string, (...args: any[]) => void> = new Map();
  private readonly parse: Parse = new Parse();
  private clients: Clients;
  public id: number;

  constructor(socket: net.Socket, client: Clients) {
    this.socket = socket;
    this.clients = client;
    this.id = socket.remotePort;
    this.listenData();
  }

  // Register a listener function for a specific event
  public on(listener: string, def: (...args) => void): boolean {
    this.handlers.set(listener, def);

    return true;
  }

  // Emit an event with associated data
  public emit(event: string, data: any): boolean {
    this.socket.write(JSON.stringify({ event, data, end: true }));
    return true;
  }

  // Listen for data events on the socket
  private listenData() {
    this.socket.on("data", (data) => {
      this.buffer += data.toString();
      this.handleRequest();
    });
  }

  public onDisconnect(cb: (data: boolean) => void) {
    this.socket.on("close", (data: boolean) => {
      this.clients.removeConnection(this.socket.remotePort);
      cb(data);
    });
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
      } catch (error) {
        console.log("not registered handlers");
      }
    }
  }

  public close(): boolean {
    this.socket.destroy();
    return true;
  }
}
