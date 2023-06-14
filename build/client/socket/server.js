"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Io = void 0;
const net_1 = __importDefault(require("net"));
const socket_1 = require("./socket");
class Io {
    constructor(port) {
        this.port = port;
        this.handlers = new Map();
    }
    createConnection(cb) {
        this.client = net_1.default.createConnection(this.port, "localhost", () => {
            cb();
        });
        return new socket_1.Client(this.client);
    }
}
exports.Io = Io;
