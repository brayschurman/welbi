import {
  type DefaultSession,
  getServerSession,
  type NextAuthOptions,
} from "next-auth";
import { type Adapter } from "next-auth/adapters";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "~/server/db";

import { PrismaAdapter } from "@auth/prisma-adapter";

import { fetchUserByEmailAndPassword } from "./api/trpc";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      email: string;
      token: string;
      // role: UserRole;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    email: string;
    token: string;
    // ...other properties
    // role: UserRole;
  }
}
interface JWT {
  user: {
    id: string;
  };
  token: string;
}

interface Session {
  user: {
    id: string;
    email: string;
    token: string;
  };
}
interface ResponseData {
  token: string;
}

async function fetchAuthToken(email: string): Promise<string | null> {
  const response = await fetch("https://welbi.org/api/start", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  if (response.ok) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const data: ResponseData = await response.json();
    return data.token;
  }

  return null;
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    // @ts-expect-error todo again...
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token) {
        session.user = {
          ...session.user,
          id: token.user.id,
          token: token.token,
        };
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = {
          id: user.id,
        };
        token.token = user.token;
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "your-email@example.com",
        },
      },
      // @ts-expect-error todo...
      async authorize(credentials) {
        if (credentials) {
          const user = await fetchUserByEmailAndPassword(credentials.email);
          if (user) {
            const token = await fetchAuthToken(user.email);
            if (token) {
              return {
                ...user,
                token,
              };
            }
          }
        }
        return null;
      },
    }),

    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
