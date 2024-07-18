import { getAuthSession } from "@/lib/auth";
import UpdateForm from "./UpdateForm";
import { User } from "next-auth";

export default async function Page() {
  const session = await getAuthSession();

  if (!session || !session.user) return <h1>You are not signed in bitch</h1>;

  return (
    <div className="profile">
      <div className="heading-div">
        <h1 className="heading">Update your profile</h1>
      </div>

      <UpdateForm user={session.user as User & { username: string }} />
    </div>
  );
}
