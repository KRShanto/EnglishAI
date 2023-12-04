import { create } from "zustand";
import { io } from "socket.io-client";
import { ClientSocketType } from "@/types/socket";

interface SocketState {
  socket: ClientSocketType | null;
  connecting: boolean;
  connect: () => Promise<ClientSocketType | null>;
}

export const useSocketStore = create<SocketState>((set, get) => ({
  socket: null,
  connecting: false,
  connect: async () => {
    // Check if the socket is already connected
    const oldSocket = get().socket;
    if (oldSocket) {
      console.log("socket already connected");
      return oldSocket;
    }

    // Check if the socket is already connecting
    const connecting = get().connecting;
    if (connecting) {
      console.log("socket already connecting");
      return null;
    }

    // Set connecting to true
    set({ connecting: true, socket: null });

    console.log("I am connecting the socket");
    // Connect to the socket server
    await fetch("/api/socket");
    // @ts-ignore
    const socket = io() as ClientSocketType;

    // Save the socket to the store
    set({ socket, connecting: false });

    // Return the socket
    return socket;
  },
}));
