import { Client } from "./socket";
export declare class Io {
    private port;
    private client;
    private handlers;
    private clientObject;
    constructor(port: number);
    createConnection(cb: () => void): Client;
}
