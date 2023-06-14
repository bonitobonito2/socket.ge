import net from "net";
import { Parse } from "../parser/parse";

export class Client {
  private handlers: Map<string, (...args: any[]) => void>;
  private buffer: string;
  private client: net.Socket;
  private parse: Parse;

  /**
   * Creates a new Client instance.
   *
   * @param client - The underlying net.Socket object representing the client connection.
   */
  constructor(client: net.Socket) {
    this.client = client;
    this.handlers = new Map();
    this.onData();
    this.parse = new Parse();
    this.buffer = "";
  }

  /**
   * Register a listener function for a specific event.
   *
   * @param listener - The event name to listen for.
   * @param def - The callback function to handle the event.
   * @returns true if the listener is successfully registered.
   */
  public on(listener: string, def: (...args) => void): boolean {
    this.handlers.set(listener, def);
    return true;
  }

  /**
   * Handle incoming data by parsing it and calling the associated handler function.
   */
  private handleRequest() {
    while (this.buffer.includes('"end":true}')) {
      // Parse the incoming data from the buffer and return it as an object
      const data = this.parse.parseIncomingData(this.buffer);

      // Taking new buffer to counter a while loop.
      this.buffer = data[1];

      try {
        // Taking a request to handle it.
        this.handlers.get(data[0]["path"])(data[0]["data"]);
      } catch (error) {
        // Handler not registered or error occurred
      }
    }
  }

  /**
   * Listen for incoming data from the server.
   */
  private onData() {
    this.client.on("data", (data) => {
      this.buffer += data.toString();
      this.handleRequest();
    });

    this.client.on("close", () => {
      console.log("Disconnected from the server");
    });
  }

  /**
   * Emit an event with associated data to the server.
   *
   * @param eventName - The name of the event to emit.
   * @param data - The data to send along with the event.
   */
  public emit(eventName: string, data: any) {
    this.client.write(
      JSON.stringify({ path: eventName, data: data, end: true })
    );
  }

  /**
   * Close the client connection.
   */
  public close() {
    this.client.destroy();
  }
}
