"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const net_1 = __importDefault(require("net"));
const socket_1 = require("./socket");
const clients_1 = require("./clients");
class Server {
    constructor(port) {
        this.clients = new clients_1.Clients();
        this.port = port;
    }
    on(connection, cb) {
        switch (connection) {
            case "connection":
                // Create a server instance to handle connection events
                this.server = net_1.default.createServer((socket) => {
                    // Obtain the remote IP address and port
                    this.clients.addConnection(socket.remotePort, socket);
                    // Create a SocketInstance and invoke the callback with it
                    cb(new socket_1.SocketInstance(socket, this.clients));
                });
                break;
        }
        this.listen();
    }
    listen() {
        this.server.listen(this.port, () => {
            console.log("Server is listening on port", this.port);
        });
    }
}
exports.Server = Server;
