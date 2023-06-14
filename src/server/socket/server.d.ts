import { Server as NetServer, Socket } from "net";
import { SocketInstance } from "./socket";
import { SocketInterface } from "./interfaces/socket.interface";
import { ServerInterface } from "./interfaces/server.interface";
import { Clients } from "./clients";

declare class Server implements ServerInterface {
  private server: NetServer;
  private readonly port: number;
  private clients: Clients;

  constructor(port: number);

  public on(
    connection: "connection",
    cb: (socket: SocketInterface) => void
  ): void;

  private listen(): void;
}

export = Server;
