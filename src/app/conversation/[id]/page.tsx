import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { AuthSession } from "@/types/auth";
import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { IoSend } from "react-icons/io5";

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

  const handler = async (formData: FormData) => {
    "use server";

    const text = formData.get("text") as string;

    await db.message.create({
      data: {
        text,
        user: {
          connect: {
            id: user.id,
          },
        },
        room: {
          connect: {
            id: room.id,
          },
        },
      },
    });
  };

  return (
    <div className="conversation-page">
      <div className="header">
        <div className="info">
          <Link href="/conversation" className="back">
            <FaArrowLeft />
          </Link>

          <div className="user">
            <Image
              src={otherUser.image}
              alt="User"
              width={50}
              height={50}
              className="avatar"
            />

            <h2 className="name">{otherUser.name}</h2>
          </div>
        </div>
      </div>

      <div className="messages">
        {room.messages.map((message) => (
          <div
            className={`message ${
              message.user.id === user.id ? "sent-msg" : "received-msg"
            }`}
            key={message.id}
          >
            <p className="text">{message.text}</p>
          </div>
        ))}
      </div>

      <form className="form" action={handler}>
        <input
          type="text"
          placeholder="Type a message..."
          className="input"
          autoComplete="off"
          name="text"
        />

        <button type="submit">
          <IoSend />
        </button>
      </form>
    </div>
  );
}
