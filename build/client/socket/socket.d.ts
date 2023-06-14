/// <reference types="node" />
import net from "net";
export declare class Client {
    private handlers;
    private buffer;
    private client;
    private parse;
    constructor(client: net.Socket);
    on(listener: string, def: (...args: any[]) => void): boolean;
    private handleRequest;
    private onData;
    emit(eventName: string, data: any): void;
    private something;
    close(): void;
}
