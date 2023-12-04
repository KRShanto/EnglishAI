import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { AuthSession } from "@/types/auth";
import Conversation from "./Conversation";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  const session = (await getAuthSession()) as AuthSession | null;

  if (!session) {
    return <h1>You are not logged in bitch</h1>;
  }

  const { user } = session;

  // Wait for 3 seconds
  // await new Promise((resolve) => setTimeout(resolve, 3000));

  const room = await db.room.findFirst({
    where: { id },
    select: {
      id: true,
      users: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
      messages: {
        select: {
          id: true,
          text: true,
          user: {
            select: {
              id: true,
            },
          },
        },
      },
    },
  });

  if (!room) {
    return <h1>Room not found</h1>;
  }

  const otherUser = room.users.filter((u) => u.id != user.id)[0];

  return <Conversation otherUser={otherUser} user={user} room={room} />;
}
