import "server-only";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcrypt";
import { cache } from "react";
import { cookies, headers } from "next/headers";
import { db } from "./db";
import { getServerSession } from "next-auth";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  secret: process.env.SECRET!,
  session: {
    strategy: "jwt",
  },
  theme: {
    colorScheme: "dark",
  },
  providers: [
    CredentialsProvider({
      name: "English AI",
      credentials: {
        email: { label: "Your Email", type: "email" },
        password: { label: "Your Password", type: "password" },
      },

      // Login the user
      async authorize(credentials) {
        const { email, password } = credentials!;

        if (!email || !password) {
          throw new Error("Missing email or password");
        }

        const user = await db.user.findUnique({
          where: { email },
        });

        if (!user) {
          throw new Error("Invalid email or password. Please try again.");
        }

        // if no password is set, it means the user is using a social account
        if (!user.password) {
          throw new Error(
            "You are using a social account. Please login with your social account or click Forgot Password to set a password."
          );
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password);

        if (!isPasswordMatched) {
          throw new Error("Invalid email or password. Please try again.");
        }

        return user;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    async session({ session, token }) {
      if (token) {
        // @ts-ignore
        session.user.id = token.id;
        // @ts-ignore
        session.user.name = token.name;
        // @ts-ignore
        session.user.username = token.username;
        // @ts-ignore
        session.user.email = token.email;
        // @ts-ignore
        session.user.image = token.picture;
      }
      return session;
    },

    async jwt({ token, user }) {
      // find the user
      const dbUser = await db.user.findUnique({
        where: { email: token.email! },
      });

      if (!dbUser) {
        token.id = user.id;
        return token;
      }

      return {
        ...token,
        id: dbUser.id,
        name: dbUser.name,
        username: dbUser.username,
        email: dbUser.email,
        image: dbUser.image,
      };
    },
  },
};

// Currently we have to manually create req and res object to pass to getServerSession (in Next13)
export const getAuthSession = cache(async () => {
  const req = {
    headers: Object.fromEntries(headers() as Headers),
    cookies: Object.fromEntries(
      cookies()
        .getAll()
        .map((c) => [c.name, c.value])
    ),
  };
  const res = { getHeader() {}, setCookie() {}, setHeader() {} };

  // @ts-ignore - The type used in next-auth for the req object doesn't match, but it still works fine.
  return await getServerSession(req, res, authOptions);
});
