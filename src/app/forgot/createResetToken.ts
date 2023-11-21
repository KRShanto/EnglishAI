"use server";

import { v4 as uuidv4 } from "uuid";
import { createTransport } from "nodemailer";
import { db } from "@/lib/db";
import { FormErrorType } from "@/types/form-errror";
import * as EmailValidator from "email-validator";

interface Response {
  success?: boolean;
  error?: FormErrorType;
  data?: {
    resendTime: Date;
  };
}

// Create a reset token and send it to the user's email
// Save the reset token to the database
export async function createResetToken(email: string): Promise<Response> {
  // Check if email is valid
  if (!email || !EmailValidator.validate(email)) {
    return {
      error: { message: "Invalid email address", field: "email" },
    };
  }

  // find the user
  const user = await db.user.findFirst({
    where: {
      email,
    },
  });

  if (!user) {
    return {
      error: { message: `User not found with email ${email}`, field: "all" },
    };
  }

  // Check if the user has already requested a password reset
  if (
    user.passwordResetTokenResendTime &&
    user.passwordResetTokenResendTime > new Date()
  ) {
    return {
      success: true,
      data: {
        resendTime: user.passwordResetTokenResendTime,
      },
    };
  }

  const resetToken = uuidv4();

  const resendTime = new Date(Date.now() + 60000); // 1 minute

  // Update the user's password reset token
  await db.user.update({
    where: {
      id: user.id,
    },
    data: {
      passwordResetToken: resetToken,
      passwordResetTokenExpires: new Date(Date.now() + 3600000), // 1 hour
      passwordResetTokenResendTime: resendTime,
    },
  });

  // Setup the email
  const transporter = createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_EMAIL_PASSWORD,
    },
  });

  // Prepare the email
  // TODO: better email template
  const mailOptions = {
    from: process.env.SMTP_EMAIL,
    to: email,
    subject: "Reset your password",
    // TODO: better email template
    html: `
        <div>
            <h1>Reset your password</h1>
            <p>Click <a href="http://localhost:3000/reset?token=${resetToken}">here</a> to reset your password</p>
        </div>
    `,
  };

  // Send the email
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    }
  });

  return {
    success: true,
    data: {
      resendTime,
    },
  };
}
