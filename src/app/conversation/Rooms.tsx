import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { AuthSession } from "@/types/auth";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { FaPlus } from "react-icons/fa";

export default async function DisplayRooms() {
  return (
    <div className="rooms">
      <div className="header">
        <h2 className="heading">Conversation</h2>

        <div className="options">
          <Link href="/search" className="option">
            <FaPlus />
          </Link>
        </div>
      </div>

      <Suspense fallback={<Loading />}>
        <Rooms />
      </Suspense>
    </div>
  );
}

async function Rooms() {
  // Wait for 5 seconds
  // await new Promise((resolve) => setTimeout(resolve, 5000));

  const session = (await getAuthSession()) as AuthSession | null;

  if (!session) {
    return <h1>You are not logged in bitch</h1>;
  }

  const { user } = session;

  // Fetch the rooms associated with this user (from prisma)
  const rooms = await db.room.findMany({
    where: {
      users: {
        some: {
          id: user.id,
        },
      },
    },
    select: {
      users: true,
      id: true,
    },
  });

  // Get the other users
  const roomsWithUsers = rooms.flatMap((room) =>
    room.users
      .filter((u) => u.id !== user.id)
      .map((u) => ({
        id: room.id,
        user: u,
      }))
  );

  return (
    <>
      {roomsWithUsers.map((room) => (
        <div className="list" key={room.user.id}>
          <Link href={`/conversation/${room.id}`} className="room">
            <Image
              src={room.user.image}
              alt="Room"
              width={70}
              height={70}
              className="avatar"
            />

            <h3 className="name">{room.user.name}</h3>
          </Link>
        </div>
      ))}
    </>
  );
}

// show skeleton loading
function Loading() {
  return (
    <>
      <div className="list">
        <div className="room">
          <div className="avatar skeleton" />

          <div className="name skeleton" />
        </div>
      </div>

      <div className="list">
        <div className="room">
          <div className="avatar skeleton" />

          <div className="name skeleton" />
        </div>
      </div>

      <div className="list">
        <div className="room">
          <div className="avatar skeleton" />

          <div className="name skeleton" />
        </div>
      </div>
    </>
  );
}
