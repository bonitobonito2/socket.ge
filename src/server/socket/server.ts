import net from "net";
import { SocketInstance } from "./socket";
import { SocketInterface } from "./interfaces/socket.interface";
import { ServerInterface } from "./interfaces/server.interface";
import { Clients } from "./clients";

export class Server implements ServerInterface {
  private server: net.Server;
  private readonly port: number;
  private clients: Clients;

  /**
   * Creates a new Server instance.
   *
   * @param port - The port number on which the server will listen for connections.
   */
  constructor(port: number) {
    this.clients = new Clients();
    this.port = port;
  }

  /**
   * Register a callback function to handle connection events.
   *
   * @param connection - The event name, currently only supports "connection".
   * @param cb - The callback function to handle the connection event.
   */
  public on(
    connection: "connection",
    cb: (socket: SocketInterface) => void
  ): void {
    switch (connection) {
      case "connection":
        // Create a server instance to handle connection events
        this.server = net.createServer((socket) => {
          // Obtain the remote IP address and port
          this.clients.addConnection(socket.remotePort, socket);
          // Create a SocketInstance and invoke the callback with it
          cb(new SocketInstance(socket, this.clients));
        });
        break;
    }

    this.listen();
  }

  /**
   * Start listening for incoming connections on the specified port.
   * Automatically called after creating the server instance.
   */
  private listen() {
    this.server.listen(this.port, () => {
      console.log("Server is listening on port", this.port);
    });
  }
}
