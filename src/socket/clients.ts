import net from "net";

export class Clients {
  public connections: Map<number, net.Socket> = new Map();
  public rooms: Map<string, Array<number>> = new Map();
  public addConnection(number: number, socket: net.Socket): void {
    this.connections.set(number, socket);
  }
  public removeConnection(number: number): void {
    this.connections.delete(number);
  }

  public createRoom(roomName: string, users: Array<number>) {
    this.rooms.set(roomName, users);
  }

  public addUserToRoom(roomName: string, user: number) {
    this.rooms.get(roomName).push(user);
  }

  public addUsersToRoom(roomName: string, users: Array<number>) {
    this.rooms.get(roomName).concat(users);
  }
}
