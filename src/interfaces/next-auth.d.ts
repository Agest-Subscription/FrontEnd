import { DefaultSession } from "next-auth";

import { Authenticate } from "./model/authentications";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      accessToken: string;
      refreshToken: string;
      isAdmin: boolean;
    } & DefaultSession["user"];
  }

  interface User {
    id: number;
    email: string;
    is_admin: boolean;
    authenticate: Authenticate;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    isAdmin: boolean;
  }
}
