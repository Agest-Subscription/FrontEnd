import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import jwtDecode from "jwt-decode";

import { axiosClient } from "@/config/axios/client";
interface BaseTokenClaims {
  exp: number;
}
// Server refresh token is 7 day, access token is 15mins
const checkTokenExpired = (token: string) => {
  if (!token) throw new Error("No token provided to be decoded");

  const { exp } = jwtDecode<BaseTokenClaims>(token);
  const nowTimeStamp = new Date().getTime(); // current time in milliseconds
  const bufferTimeStamp = nowTimeStamp + 10 * 60 * 1000; // 10 minute from now
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
          console.log("error authorize: ", error);
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
    jwt: async ({ token, user }) => {
      if (user) {
        token.access_token = user?.authenticate?.access_token;
        token.refresh_token = user?.authenticate?.refresh_token;
        token.isAdmin = user?.is_admin;
      }

      const accessToken =
        typeof token.access_token === "string" ? token.access_token : "";

      const refreshToken =
        typeof token.refresh_token === "string" ? token.refresh_token : "";

      //console.log("token.refreshToken:  ", token.refreshToken);

      // Here, check the token validity date
      if (checkTokenExpired(accessToken)) {
        // Call the endpoint where you handle the token refresh for a user

        try {
          const user = await axios.post(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/refresh`,
            {
              access_token: accessToken,
              refresh_token: refreshToken,
            },
          );
          // Check for the result and update the data accordingly
          // console.log("...user: ", user?.data);
          // console.log("...token: ", token);

          // console.log("new access_token: ", user?.data?.access_token);

          return {
            ...token,
            access_token: user?.data?.access_token,
          };
          // return { ...token, ...user };
        } catch (error) {
          console.log("error refresh token: ", error);
          //  throw Error(error);
        }
      }

      // console.log("old access_token: ", accessToken);
      // console.log("old refresh_token: ", refreshToken);

      return {
        ...token,
        access_token: accessToken,
        refresh_token: refreshToken,
      };
    },

    session: async ({ session, token }) => {
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
