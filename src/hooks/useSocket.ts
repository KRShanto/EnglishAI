import { useEffect, useState } from "react";
import { useSocketStore } from "@/stores/socket";

export function useSocket() {
  const { socket, connect } = useSocketStore();

  useEffect(() => {
    connect();
  }, []);

  return socket;
}
