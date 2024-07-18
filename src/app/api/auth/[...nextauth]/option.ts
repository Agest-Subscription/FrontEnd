import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { axiosClient } from "@/config/axios/client";

export const options: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Sign in",
      id: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const response = await axiosClient.post("/auth/login", {
            email: credentials?.email as string,
            password: credentials?.password as string,
          });
          const user = response.data;

          // If no error and we have user data, return it
          if (response.status === 200 && user) {
            return user;
          }
        } catch (error: any) {
          console.log("error credential: ", error.message);
        }
        // Return null if user data could not be retrieved

        return null;
      },
    }),
  ],
  callbacks: {
    signIn: async ({ account }) => {
      if (account?.provider === "credentials") {
        return true;
      }
      return false;
    },
    jwt: async ({ token, user }) => {
      if (user) {
        token.access_token = user?.authenticate?.access_token;
        token.refresh_token = user?.authenticate?.refresh_token;
        token.isAdmin = user?.is_admin;
      }
      return token;
    },

    session: async ({ session, token }) => {
      session.user.accessToken = token?.access_token as string;
      session.user.refreshToken = token?.refresh_token as string;
      session.user.isAdmin = token?.isAdmin;
      return session;
    },
  },
  pages: {
    signIn: "/",
    newUser: "/sign-up",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
