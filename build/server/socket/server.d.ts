import { SocketInterface } from "./interfaces/socket.interface";
import { ServerInterface } from "./interfaces/server.interface";
export declare class Server implements ServerInterface {
    private server;
    private readonly port;
    private clients;
    constructor(port: number);
    on(connection: "connection", cb: (socket: SocketInterface) => void): void;
    private listen;
}
