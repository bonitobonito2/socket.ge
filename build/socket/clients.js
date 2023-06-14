"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Clients = void 0;
/**
 * Class representing client connections and rooms.
 */
class Clients {
    constructor() {
        this.connections = new Map();
        this.rooms = new Map();
    }
    addConnection(number, socket) {
        this.connections.set(number, socket);
    }
    removeConnection(number) {
        this.connections.delete(number);
    }
    removeUserFromRoomEveryRoom(userId) {
        this.rooms.forEach((users) => {
            const index = users.indexOf(userId);
            if (index !== -1) {
                users.splice(index, 1);
            }
        });
    }
    getUsersByRoomName(roomName) {
        return this.rooms.get(roomName);
    }
    createRoom(roomName) {
        this.rooms.set(roomName, []);
    }
    addUserToRoom(roomName, user) {
        if (!this.rooms.get(roomName))
            this.createRoom(roomName);
        this.rooms.get(roomName).push(user);
    }
    addUsersToRoom(roomName, users) {
        this.rooms.get(roomName).concat(users);
    }
}
exports.Clients = Clients;
