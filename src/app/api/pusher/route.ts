import { getPusherInstance } from "@/lib/pusher/server";
import { AuthSession } from "@/types/auth";
import { getAuthSession } from "@/lib/auth";
import { nanoid } from "nanoid";
import { openAICheckGrammar } from "@/actions/grammar-checker/openAICheckGrammar";
import { db } from "@/lib/db";

const pusher = getPusherInstance();

// POST /api/pusher/trigger
// Trigger a message to the client
// Body: { message, roomId }
export async function POST(req: Request, res: Response) {
  const session = (await getAuthSession()) as AuthSession | null;
  if (!session) return new Response("Unauthorized", { status: 401 });

  const userId = session.user.id;
  const body = await req.json();
  const { roomId, message } = body;
  // generate a random id
  const id = nanoid(15);

  try {
    // send the raw message to the room
    pusher.trigger(`${roomId}`, "message", {
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
      userId,
    });

    // // Check grammar
    const res = await openAICheckGrammar(message);

    // send the result to the room
    pusher.trigger(`${roomId}`, "openai-response", {
      msg: {
        id,
        openAIstatus: "done",
        message: res,
      },
    });

    // Save to the database
    await db.message.create({
      data: {
        user: { connect: { id: userId } },
        room: { connect: { id: roomId } },
        // @ts-ignore
        msg: { id, message: res },
      },
    });

    // send json
    return new Response(JSON.stringify({ message: "Message sent" }));
  } catch (e) {
    console.error(e);
    return new Response("Failed to send message", { status: 500 });
  }
}
