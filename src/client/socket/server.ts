import net from "net";
import { Client } from "./socket";

export class Io {
  private port: number;
  private client: net.Socket;

  /**
   * Creates a new Io instance.
   *
   * @param port - The port number to connect to.
   */
  constructor(port: number) {
    this.port = port;
  }

  /**
   * Create a connection to the server and return a Client instance.
   *
   * @param cb - Optional callback function to execute once the connection is established.
   * @returns A Client instance representing the client connection.
   */
  public createConnection(cb?: () => void): Client {
    this.client = net.createConnection(this.port, "localhost", () => {
      if (cb) {
        cb();
      }
    });
    return new Client(this.client);
  }
}
