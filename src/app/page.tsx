import { getAuthSession } from "@/lib/auth";

export default async function Page() {
  const session  = await getAuthSession();

  return (
    <>
      <h1>{
        session ? `Hello ${session?.user?.name}` : "Not signed in"
      }
      </h1>
    </>
  );
}
