import { db } from "@/lib/db";
import { User } from "next-auth";
import bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";
import { MIN_PASSWORD_LENGTH } from "@/lib/consts";

// TODO: toast notification
export default function UpdateForm({
  user,
}: {
  user: User & { username: string };
}) {
  return (
    <form
      className="update-form"
      action={async (data: FormData) => {
        "use server";

        const name = data.get("name") as string;
        const username = data.get("username") as string;
        const email = data.get("email") as string;
        const oldPassword = data.get("old-password") as string;
        const newPassword = data.get("new-password") as string;

        // Update the user
        const dbUser = await db.user.findFirst({ where: { id: user.id } });

        let password = dbUser?.password;

        if (oldPassword && newPassword) {
          // Match the password
          const isPasswordMatched = await bcrypt.compare(
            oldPassword,
            password!
          );

          if (!isPasswordMatched) {
            // TODO: Throw error in toast
            console.log("Password didn't match");
          } else {
            if (newPassword.length < MIN_PASSWORD_LENGTH) {
              // TODO: Throw error in toast
              console.log("Password is too short");
            }
            password = await bcrypt.hash(newPassword, 10);
          }
        }

        await db.user.update({
          where: { id: user.id },
          data: {
            name: name || dbUser?.name,
            username: username || dbUser?.username,
            email: email || dbUser?.email,
            password,
          },
        });

        // TODO: Send a toast
      }}
    >
      <div className="wrap">
        <label htmlFor="name">Name</label>
        <input type="text" defaultValue={user.name!} name="name" id="name" />
      </div>

      <div className="wrap">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          defaultValue={user.username}
          name="username"
          id="username"
        />
      </div>

      <div className="wrap">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          defaultValue={user.email!}
          name="email"
          id="email"
        />
      </div>

      <div className="wrap">
        {/* TODO: Eye button */}
        <label htmlFor="old-password">Old Password</label>
        <input type="password" name="old-password" id="old-password" />
      </div>

      <div className="wrap">
        {/* TODO: Eye button */}
        <label htmlFor="new-password">New Password</label>
        <input type="password" name="new-password" id="new-password" />
      </div>

      {/* TODO: loading */}
      <button>Update</button>
    </form>
  );
}
