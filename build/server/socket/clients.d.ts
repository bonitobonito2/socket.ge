/// <reference types="node" />
import net from "net";
/**
 * Class representing client connections and rooms.
 */
export declare class Clients {
    connections: Map<number, net.Socket>;
    rooms: Map<string, Array<number>>;
    constructor();
    addConnection(number: number, socket: net.Socket): void;
    removeConnection(number: number): void;
    removeUserFromRoomEveryRoom(userId: number): void;
    getUsersByRoomName(roomName: string): Array<number>;
    createRoom(roomName: string): void;
    addUserToRoom(roomName: string, user: number): void;
    addUsersToRoom(roomName: string, users: Array<number>): void;
}
