import { Socket } from "socket.io";

export type ClientSocketType = Socket<
  ServerToClientMessage,
  ClientToServerMessage
>;

export interface ServerToClientMessage {
  message: (params: {
    message: string;
    userId: string;
    roomId: string;
  }) => void;
}

export interface ClientToServerMessage {
  // Set the user id for this socket
  setup: (params: { id: string }) => void;
  "join-room": (params: { roomId: string }) => void;
  "send-message": (params: { message: string; roomId: string }) => void;
}

export interface InterServerMessage {}

export interface SocketData {
  userId: string;
}
