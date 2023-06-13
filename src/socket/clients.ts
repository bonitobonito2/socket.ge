import net from "net"; // Importing the 'net' module

/**
 * Class representing client connections and rooms.
 */
export class Clients {
  public connections: Map<number, net.Socket>; // Map to store client connections by their assigned numbers
  public rooms: Map<string, Array<number>>; // Map to store rooms and their associated users

  constructor() {
    this.connections = new Map();
    this.rooms = new Map();
  }
  public addConnection(number: number, socket: net.Socket): void {
    this.connections.set(number, socket);
  }

  public removeConnection(number: number): void {
    this.connections.delete(number);
  }

  public removeUserFromRoomEveryRoom(userId: number) {
    this.rooms.forEach((users) => {
      const index = users.indexOf(userId);
      if (index !== -1) {
        users.splice(index, 1);
      }
    });
  }

  public getUsersByRoomName(roomName: string): Array<number> {
    return this.rooms.get(roomName);
  }

  public createRoom(roomName: string) {
    this.rooms.set(roomName, []);
  }

  public addUserToRoom(roomName: string, user: number) {
    if (!this.rooms.get(roomName)) this.createRoom(roomName);
    this.rooms.get(roomName).push(user);
  }

  public addUsersToRoom(roomName: string, users: Array<number>) {
    this.rooms.get(roomName).concat(users);
  }
}
