import { Socket } from "net";
import { Parse } from "../parser/parse";

declare class Client {
  private handlers: Map<string, (...args: any[]) => void>;
  private buffer: string;
  private client: Socket;
  private parse: Parse;

  constructor(client: Socket);

  public on(listener: string, def: (...args: any[]) => void): boolean;
  private handleRequest(): void;
  private onData(): void;
  public emit(eventName: string, data: any): void;
  public close(): void;
}

export = Client;
