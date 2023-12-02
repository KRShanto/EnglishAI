"use server";

import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { AuthSession } from "@/types/auth";
import { SearchData } from "@/types/search";

// Query the user by their name
// This function assumes that the user is already logged in
export async function search(name: string): Promise<SearchData[]> {
  if (!name) return [];

  const currentUser = (await getAuthSession()) as AuthSession;

  // Find the user by their name
  // Mark if the user is connected to the current user (isConnected: boolean)
  const usersFromDB = await db.user.findMany({
    where: {
      name: {
        contains: name,
        mode: "insensitive",
      },
    },
    select: {
      id: true,
      name: true,
      image: true,
      username: true,
      rooms: {
        select: {
          users: {
            select: {
              id: true,
            },
          },
        },
      },
    },
  });

  // if user is same as current user, isConnected is null
  const users = usersFromDB.map((user) => {
    const isConnected =
      user.id === currentUser.user.id
        ? null
        : user.rooms.some((room) => {
            return room.users.some((u) => u.id === currentUser.user.id);
          });

    return {
      ...user,
      isConnected,
    };
  });

  return users;
}
