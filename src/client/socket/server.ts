import net from "net";
import { Parse } from "../parser/parse";
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
      console.log("client connected to server");
      cb();
    });
    return new Client(this.client);
  }
}

class Client {
  private handlers: Map<string, (...args: any[]) => void>;
  private buffer: string;
  private client: net.Socket;
  private parse: Parse;

  constructor(client: net.Socket) {
    this.client = client;
    this.handlers = new Map();
    this.onData();
    this.parse = new Parse();
    this.buffer = "";
  }
  public on(listener: string, def: (...args) => void): boolean {
    this.handlers.set(listener, def);

    return true;
  }
  private handleRequest() {
    while (this.buffer.includes('"end":true}')) {
      // Parse the incoming data from the buffer and return it as an object
      const data = this.parse.parseIncomingData(this.buffer);

      //Taking new buffer to counter a while loop.
      this.buffer = data[1];

      try {
        //Taking a request to handle it.
        console.log(this.handlers);
        this.handlers.get(data[0]["path"])(data[0]["data"]);
      } catch (error) {
        console.log("not registered handlers");
      }
    }
  }

  private onData() {
    this.client.on("data", (data) => {
      this.buffer += data.toString();
      console.log(this.buffer);
      this.handleRequest();
    });
  }

  public emit(eventName: string, data: any) {
    this.client.write(
      JSON.stringify({ path: eventName, data: data, end: true })
    );
  }
  public close() {
    this.client.destroy();
  }
}
