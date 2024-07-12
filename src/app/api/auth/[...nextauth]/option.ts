import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { axiosClient } from "@/config/axios/client";

export const options: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Sign in",
      id: "credentials",

      credentials: {
        userName: {
          label: "UserName",
          type: "userName",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          const response = await axiosClient.post("/user/auth/token", {
            userName: credentials?.userName as string,
            password: credentials?.password as string,
          });
          const user = response.data;
          console.log("return data user admin: ", user);

          // If no error and we have user data, return it
          if (response.status === 200 && user) {
            console.log("return data user 200: ", user);

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
};
