import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import jwtDecode from "jwt-decode";

import { axiosClient } from "@/config/axios/client";
import axios from "axios";
export interface BaseTokenClaims {
  ver: string;
  iss: string;
  sub: string;
  aud: string;
  exp: number;
  nonce: string;
  iat: number;
  tfp: string;
  nbf: number;
}
const checkTokenExpired = (token: string) => {
  if (!token) throw new Error("No token provided to be decoded");

  const { exp } = jwtDecode<BaseTokenClaims>(token);
  const nowTimeStamp = new Date().getTime(); // current time in milliseconds
  const bufferTimeStamp = nowTimeStamp + 1 * 60 * 1000; // 1 minute from now

  if (bufferTimeStamp > exp * 1000) return true;
  return false;
};
const handler = NextAuth({
  providers: [
    CredentialsProvider({
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

          return response.data;
        } catch (error) {
          console.log(error);
          //  throw Error(error);
        }
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
    jwt: async ({ token, user, account }) => {
      if (user) {
        token.access_token = user?.authenticate?.access_token;
        token.refresh_token = user?.authenticate?.refresh_token;
        token.isAdmin = user?.is_admin;
      }
      console.log("token: ", token);

      console.log("account: ", account);
      const accessToken =
        typeof token.accessToken === "string" ? token.accessToken : "";

      console.log("token.accessToken:  ", token.accessToken);

      const refreshToken =
        typeof token.refreshToken === "string" ? token.refreshToken : "";

      console.log("token.refreshToken:  ", token.refreshToken);

      // // Here, check the token validity date
      // if (checkTokenExpired(accessToken)) {
      //   // Call the endpoint where you handle the token refresh for a user
      //   const user = await axios.post(`${process.env.API_URL}/auth/refresh`, {
      //     access_token: accessToken,
      //     refresh_token: refreshToken,
      //   });
      //   // Check for the result and update the data accordingly
      //   return { ...token, ...user };
      // }
      return token;
    },

    session: async ({ session, token }) => {
      // session.user.accessToken = token?.access_token as string;
      // session.user.refreshToken = token?.refresh_token as string;
      // session.user.isAdmin = token?.isAdmin;

      return {
        ...session,
        user: {
          ...session.user,
          accessToken: token?.access_token as string,
          refreshToken: token?.refresh_token as string,
          isAdmin: token?.isAdmin,
        },
      };
    },
  },
  pages: {
    signIn: "/",
    newUser: "/sign-up",
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
