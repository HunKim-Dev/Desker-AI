import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "./lib/prisma";
import bcrypt from "bcryptjs";
import validator from "validator";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        const email = String(credentials?.email ?? "");
        const password = String(credentials?.password ?? "").trim();

        if (!validator.isEmail(email) || !password) return null;

        const user = await prisma.user.findUnique({
          where: { email },
          select: {
            id: true,
            passwordHash: true,
            emailVerified: true,
          },
        });

        if (!user) return null;

        if (!user.emailVerified) return null;

        const passwordValid = await bcrypt.compare(password, user.passwordHash);

        if (!passwordValid) return null;

        const chatbot = await prisma.chatbot.findFirst({
          where: { userId: user.id },
          select: { id: true },
        });

        return {
          id: user.id,
          botId: chatbot?.id ?? null,
        };
      },
    }),
  ],

  pages: {
    signIn: "/login",
  },

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        (token as any).id = (user as any).id;
        (token as any).botId = (user as any).botId ?? null;
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = (token as any).id as string;
        (session.user as any).botId = (token as any).botId ?? null;
      }

      return session;
    },
  },
});
