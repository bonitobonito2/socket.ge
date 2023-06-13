import net from "net";

const PORT = 8080;

enum OnKeyWords {
  CONNECTION,
}
export class Server {
  private server: net.Server;
  private readonly port: number;

  constructor(port: number) {
    this.port = port;
  }

  public on(
    connectio: "connection" | "close",
    cb: (socket: SocketInstance) => void
  ) {
    switch (connectio) {
      case "connection":
        this.server = net.createServer((socket) => {
          cb(new SocketInstance(socket));
          //   socket.write("connection established");
        });
    }

    this.server.listen(this.port, () => {
      console.log("server is listening");
    });
  }
}

export class SocketInstance {
  private socket: net.Socket;
  private buffer: string = "";
  private handlers: Map<string, (...args: any[]) => void> = new Map();
  constructor(socket: net.Socket) {
    this.socket = socket;
    this.listenData();
  }

  private parseIncomingData(): Object {
    const endIndex = this.buffer.indexOf("}") + 1;
    const jsonString = this.buffer.substring(0, endIndex);
    this.buffer = this.buffer.substring(endIndex);
    return JSON.parse(jsonString);
  }

  public on(listener: string, def: (...args) => void) {
    this.handlers.set(listener, def);
  }
  public listenData() {
    this.socket.on("data", (data) => {
      this.buffer += data.toString();

      while (this.buffer.includes("}")) {
        const lastData = this.parseIncomingData();

        try {
          this.handlers.get(lastData["path"])(lastData["data"]);
        } catch (error) {
          console.log("Not registared handlers for ", lastData["path"]);
        }
      }
    });
  }
}
