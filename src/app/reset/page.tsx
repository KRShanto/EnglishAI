import { db } from "@/lib/db";
import ResetError from "./ResetError";
import ResetForm from "./ResetForm";

export default async function Page({
  searchParams,
}: {
  searchParams: { token: string };
}) {
  const { token } = searchParams;

  // Find the user
  const user = await db.user.findFirst({
    where: {
      passwordResetToken: token,
    },
  });

  if (!user) {
    return (
      <ResetError message="Your password reset token is invalid or expired" />
    );
  }

  // Check if token is expired
  if (user.passwordResetTokenExpires! < new Date()) {
    return <ResetError message="Your password reset token is expired" />;
  }

  return <ResetForm userId={user!.id} email={user!.email} />;
}
