"use server";

import bcrypt from "bcrypt";
import { db } from "@/lib/db";
import { MIN_PASSWORD_LENGTH } from "@/lib/consts";

// Update the user's password
// Remove the reset token
// NOTE: This action assumes that the token has already been verified
export async function resetPassword({
  newPassword,
  userId,
}: {
  newPassword: string;
  userId: string;
}) {
  // Check if the new password is long enough
  if (newPassword.length < MIN_PASSWORD_LENGTH) {
    return {
      error: "Your password must be at least 6 characters long.",
    };
  }

  // hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);

  // Update the user's password and remove the reset token
  await db.user.update({
    where: {
      id: userId,
    },
    data: {
      password: hashedPassword,
      passwordResetToken: null,
      passwordResetTokenExpires: null,
      passwordResetTokenResendTime: null,
    },
  });

  return {
    success: true,
  };
}
