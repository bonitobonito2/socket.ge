import net from "net"; // Importing the 'net' module

/**
 * Class representing client connections and rooms.
 */
export class Clients {
  public connections: Map<number, net.Socket> = new Map(); // Map to store client connections by their assigned numbers
  public rooms: Map<string, Array<number>> = new Map(); // Map to store rooms and their associated users

  /**
   * Add a client connection to the 'connections' map.
   * @param number - The assigned number of the client.
   * @param socket - The client socket to be added.
   */
  public addConnection(number: number, socket: net.Socket): void {
    this.connections.set(number, socket);
  }

  /**
   * Remove a client connection from the 'connections' map.
   * @param number - The assigned number of the client.
   */
  public removeConnection(number: number): void {
    this.connections.delete(number);
  }

  /**
   * Create a room and assign the specified users to it.
   * @param roomName - The name of the room.
   * @param users - An array of user IDs to be assigned to the room.
   */
  public createRoom(roomName: string, users: Array<number>) {
    this.rooms.set(roomName, users);
  }

  /**
   * Add a user to the specified room.
   * @param roomName - The name of the room.
   * @param user - The user ID to be added to the room.
   */
  public addUserToRoom(roomName: string, user: number) {
    this.rooms.get(roomName).push(user);
  }

  /**
   * Add multiple users to the specified room.
   * @param roomName - The name of the room.
   * @param users - An array of user IDs to be added to the room.
   */
  public addUsersToRoom(roomName: string, users: Array<number>) {
    this.rooms.get(roomName).concat(users);
  }
}
