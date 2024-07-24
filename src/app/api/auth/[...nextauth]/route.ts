import { cookies } from "next/headers";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
const cookie = require("cookie");
import { axiosClient } from "@/config/axios/client";
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
          const apiCookies = response.headers["set-cookie"];
          const firstCookie = Array.isArray(apiCookies)
            ? apiCookies[0]
            : undefined;
          const secondCookie = Array.isArray(apiCookies)
            ? apiCookies[1]
            : undefined;
          // console.log("cookies header1: ", firstCookie as string);

          // console.log("cookies header2: ", secondCookie as string);

          if (firstCookie) {
            // Find the part that starts with 'access_token='
            const [accessTokenPart, ...attributesParts] =
              firstCookie.split(";");
            const [accessTokenKey, accessTokenValue] = accessTokenPart.split(
              "=",
              2,
            );

            // Trim and get the access token and its value
            const accessToken = accessTokenKey.trim();
            const valueToken = accessTokenValue ? accessTokenValue.trim() : "";

            // Join the remaining parts back into the valueToken string
            const attributes = attributesParts.join(";").trim();
            const fullValueToken = `${valueToken}`;

            // console.log("accessToken:", accessToken);
            // console.log("valueToken:", fullValueToken);
            cookies().set({
              name: accessToken,
              value: fullValueToken,
              httpOnly: true, //optional
              secure: false,
              sameSite: "strict",
              path: "/",
            });
          } else {
            console.log("No cookies found.");
          }
          console.log();

          if (secondCookie) {
            // Find the part that starts with 'refresh_token='
            const [tokenPart, ...attributesParts] = secondCookie.split(";");
            const [refreshTokenKey, refreshTokenValue] = tokenPart.split(
              "=",
              2,
            );

            // Trim and get the refresh token and its value
            const refreshToken = refreshTokenKey.trim();
            const fullRefreshTokenValue = refreshTokenValue
              ? refreshTokenValue.trim()
              : "";

            // Join the remaining parts back into the full valueToken string
            const fullValueToken = `${fullRefreshTokenValue}`;

            // console.log("refreshToken:", refreshToken);
            // console.log("refreshTokenValue:", fullValueToken);

            cookies().set({
              name: refreshToken,
              value: fullValueToken,
              httpOnly: true, //optional
              secure: false,
              sameSite: "strict",
              path: "/",
            });
          } else {
            console.log("Second cookie not found.");
          }

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
});

export { handler as GET, handler as POST };
