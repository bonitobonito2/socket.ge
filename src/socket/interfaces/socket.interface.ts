export interface SocketInterface {
  id: number;
  on(listener: string, def: (...args) => void): boolean;
  emit(event: string, data: any): boolean;
  close(): boolean;
  onDisconnect(cb: (boolean) => void): void;
}
