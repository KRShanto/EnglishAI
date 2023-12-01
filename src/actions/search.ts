"use server";

import { db } from "@/lib/db";
import { SearchData } from "@/types/search";

// Query the user by their name
export async function search(name: string): Promise<SearchData[]> {
  if (!name) return [];

  const users = await db.user.findMany({
    where: {
      name: {
        contains: name,
        mode: "insensitive",
      },
    },
    select: {
      name: true,
      image: true,
      username: true,
    },
  });

  return users;
}
