"use server";

import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { AuthSession } from "@/types/auth";
import { Session } from "next-auth";

// Create a room for two users
export async function connectUser({ id }: { id: string }) {
  const secondUser = await db.user.findUnique({
    where: {
      id,
    },
  });

  if (!secondUser) {
    return {
      error: "User not found",
    };
  }

  const session = (await getAuthSession()) as AuthSession;
  if (!session) {
    return {
      error: "You must be logged in to connect with another user",
    };
  }

  if (session.user.id === secondUser.id) {
    return {
      error: "It doesn't make sense to connect with yourself",
    };
  }

  const room = await db.room.findFirst({
    where: {
      users: {
        every: {
          id: {
            in: [session.user.id, secondUser.id],
          },
        },
      },
    },
  });

  if (room) {
    return {
      error: "You are already connected with this user",
    };
  }

  await db.room.create({
    data: {
      users: {
        connect: [
          {
            id: session.user.id,
          },
          {
            id: secondUser.id,
          },
        ],
      },
    },
  });

  return {
    success: true,
  };
}
