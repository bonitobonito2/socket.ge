import { Socket } from "net";
import { SocketInterface } from "./interfaces/socket.interface";
import { Parse } from "../parser/parse";
import { Clients } from "./clients";

declare class SocketInstance implements SocketInterface {
  private socket: Socket;
  private buffer: string;
  private handlers: Map<string, (...args: any[]) => void>;
  private readonly parse: Parse;
  private clients: Clients;
  public readonly id: number;

  constructor(socket: Socket, client: Clients);

  public on(listener: string, def: (...args: any[]) => void): boolean;

  public emit(event: string, data: any): boolean;

  public emitToRoom(roomName: string, event: string, data: any): this;

  private listenData(): void;

  private handleDiscconect(): void;

  public onDisconnect(cb: (data: boolean) => void): void;

  public join(roomName: string): void;

  private handleRequest(): void;

  public close(): boolean;
}

export = SocketInstance;
