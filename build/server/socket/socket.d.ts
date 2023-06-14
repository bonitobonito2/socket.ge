/// <reference types="node" />
import net from "net";
import { SocketInterface } from "./interfaces/socket.interface";
import { Clients } from "./clients";
export declare class SocketInstance implements SocketInterface {
    private socket;
    private buffer;
    private handlers;
    private readonly parse;
    private clients;
    readonly id: number;
    constructor(socket: net.Socket, client: Clients);
    on(listener: string, def: (...args: any[]) => void): boolean;
    emit(event: string, data: any): boolean;
    emitToRoom(roomName: string, event: string, data: any): this;
    private listenData;
    private handleDiscconect;
    onDisconnect(cb: (data: boolean) => void): void;
    join(roomName: string): void;
    private handleRequest;
    close(): boolean;
}
