import { getAuthSession } from "@/lib/auth";
import UpdateForm from "./UpdateForm";
import { User } from "next-auth";
import Title from "@/components/Title";

export default async function Page() {
  const session = await getAuthSession();

  if (!session || !session.user) return <h1>You are not signed in bitch</h1>;

  return (
    <div className="profile">
      <Title>Update your profile</Title>
      <UpdateForm user={session.user as User & { username: string }} />
    </div>
  );
}
