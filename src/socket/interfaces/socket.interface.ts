export interface SocketInterface {
  on(listener: string, def: (...args) => void): boolean;
  emit(event: string, data: any): boolean;
  close(): boolean;
}

export interface IncomingRequestProtocol {
  event: string;
  data: string;
  end: true;
}

export interface SendDataToClientProtocol {
  event: string;
  data: string;
  end: true;
}
