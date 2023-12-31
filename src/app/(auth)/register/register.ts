"use server";

import { db } from "@/lib/db";
import bcrypt from "bcrypt";
import { nanoid } from "nanoid";
import slugify from "slugify";
import * as EmailValidator from "email-validator";
import { FormErrorType } from "@/types/form-errror";
import { MIN_PASSWORD_LENGTH, DEFAULT_IMAGES } from "@/lib/consts";

interface RegisterData {
  name: string;
  email: string;
  country: string;
  password: string;
}

interface Response {
  success?: boolean;
  error?: FormErrorType;
}

export async function register({
  name,
  email,
  country,
  password,
}: RegisterData): Promise<Response> {
  // Check if any field is missing
  if (!name || !email || !country || !password) {
    return {
      error: { message: "You need to fill all the fields", field: "all" },
    };
  }

  // check if the user already created
  const user = await db.user.findUnique({
    where: { email },
  });

  if (user) {
    return {
      // error: "User already exist!",
      error: { message: "User already exist!", field: "email" },
    };
  }

  // check if the email is valid
  if (!EmailValidator.validate(email)) {
    return {
      error: { message: "Invalid email address", field: "email" },
    };
  }

  // check if the password is long enough
  if (password.length < MIN_PASSWORD_LENGTH) {
    return {
      error: {
        message: "Password must be at least 6 characters long",
        field: "password",
      },
    };
  }

  // hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // generate username
  const username = slugify(name) + "-" + nanoid(6);

  // randomly choose an image
  const image =
    DEFAULT_IMAGES[Math.floor(Math.random() * DEFAULT_IMAGES.length)];

  try {
    await db.user.create({
      data: {
        name,
        email,
        country,
        username,
        password: hashedPassword,
        image,
      },
    });

    return { success: true };
  } catch (error: any) {
    console.error("Error found while creating new user");
    console.error("The error: ", error);

    return {
      // error: "A server side error occured",
      error: { message: "A server side error occured", field: "all" },
    };
  }
}
