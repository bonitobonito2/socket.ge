import net from "net";
import { SocketInstance } from "./socket";
import { SocketInterface } from "./interfaces/socket.interface";
import { Parse } from "../parser/parse";

export class Server {
  private server: net.Server;
  private readonly port: number;
  constructor(port: number) {
    this.port = port;
  }

  /**
   * Register a callback to handle connection or close events.
   * @param connection - Event type: "connection" or "close".
   * @param cb - Callback function to handle the event.
   */
  public on(
    connection: "connection" | "close",
    cb: (socket: SocketInterface) => void | boolean
  ) {
    switch (connection) {
      case "connection":
        // Create a server instance to handle connection events
        this.server = net.createServer((socket) => {
          // Create a SocketInstance and invoke the callback with it
          cb(new SocketInstance(socket));
        });
        break;
      case "close":
        this.server.close();
        return true;
    }

    // Start the server and listen on the specified port
    this.server.listen(this.port, () => {
      console.log("Server is listening on port", this.port);
    });
  }
}
