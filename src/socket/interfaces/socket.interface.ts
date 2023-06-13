export interface SocketInterface {
  id: number;
  on(listener: string, def: (...args) => void): boolean;
  emit(event: string, data: any): boolean;
  close(): boolean;
  onDisconnect(cb: (boolean) => void): void;
  join(roomName: string): void;
  emitToRoom(roomName: string, event: string, data: any): this;
}
