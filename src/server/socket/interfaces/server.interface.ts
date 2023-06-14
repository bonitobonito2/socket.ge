import { SocketInterface } from "./socket.interface";

export interface ServerInterface {
  on: (connection: "connection", cb: (socket: SocketInterface) => void) => void;
}
