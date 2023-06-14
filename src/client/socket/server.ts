import net from "net";
import { Parse } from "../parser/parse";
import { Client } from "./socket";
export class Io {
  private port: number;
  private client: net.Socket;
  private handlers: Map<string, (...args: any[]) => void>;
  private clientObject: Client;
  constructor(port: number) {
    this.port = port;
    this.handlers = new Map();
  }
  public createConnection(cb: () => void): Client {
    this.client = net.createConnection(this.port, "localhost", () => {
      cb();
    });
    return new Client(this.client);
  }
}
