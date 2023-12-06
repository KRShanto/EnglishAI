import { openAICheckGrammar } from "@/actions/grammar-checker/openAICheckGrammar";
import { db } from "@/lib/db";
import {
  ClientToServerMessage,
  InterServerMessage,
  ServerToClientMessage,
  SocketData,
} from "@/types/socket";
import { nanoid } from "nanoid";
import { Server } from "socket.io";

export default function handler(req: any, res: any) {
  if (!res.socket.server.io) {
    // Create a new socket server
    const io = new Server<
      ClientToServerMessage,
      ServerToClientMessage,
      InterServerMessage,
      SocketData
    >(res.socket.server);

    res.socket.server.io = io;

    // Listen for new connections to Socket.IO
    io.on("connection", (socket) => {
      console.log("a user connected");

      // Set the user id
      socket.on("setup", ({ id }) => {
        console.log("setup: ", id);
        // Save the user id to the socket session for this client
        socket.data.userId = id;
      });

      socket.on("join-room", ({ roomId }) => {
        socket.join(roomId);
      });

      socket.on("send-message", async ({ message, roomId }) => {
        // generate a random id
        const id = nanoid(15);

        // send the raw message to the room
        socket.to(roomId).emit("message", {
          msg: {
            id,
            openAIstatus: "fetching",
            message: {
              text: message,
              result: {
                isCorrect: true,
                correctText: "",
                wrongText: [],
              },
            },
          },
          userId: socket.data.userId,
        });

        // send back to the sender
        socket.emit("message", {
          msg: {
            id,
            openAIstatus: "fetching",
            message: {
              text: message,
              result: {
                isCorrect: true,
                correctText: "",
                wrongText: [],
              },
            },
          },
          userId: socket.data.userId,
        });

        // Check grammar
        const res = await openAICheckGrammar(message);

        // send the result to the room
        socket.to(roomId).emit("openai-response", {
          msg: {
            id,
            openAIstatus: "done",
            message: res,
          },
        });

        // send back to the sender
        socket.emit("openai-response", {
          msg: {
            id,
            openAIstatus: "done",
            message: res,
          },
        });

        // save to database
        await db.message.create({
          data: {
            user: {
              connect: {
                id: socket.data.userId,
              },
            },
            room: {
              connect: {
                id: roomId,
              },
            },
            // @ts-ignore
            msg: { id, openAIstatus: "done", message: res },
          },
        });
      });

      socket.on("disconnect", () => {
        console.log("user disconnected");
      });
    });
  }

  res.end();
}
