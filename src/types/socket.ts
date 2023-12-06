import { Socket } from "socket.io";
import { GrammarCheckerResult } from "./grammar";
import { ChatMessage } from "./db";

export type ClientSocketType = Socket<
  ServerToClientMessage,
  ClientToServerMessage
>;

export interface ServerToClientMessage {
  message: (params: { msg: ChatMessage; userId: string }) => void;
  "openai-response": (params: { msg: ChatMessage }) => void;
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
