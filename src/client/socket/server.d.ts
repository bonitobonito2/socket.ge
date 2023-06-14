import { Socket } from "net";
import { Client } from "./socket";

declare class Io {
  private port: number;
  private client: Socket;
  private handlers: Map<string, (...args: any[]) => void>;
  private clientObject: Client;

  constructor(port: number);

  public createConnection(cb: () => void): Client;
}

export = Io;
