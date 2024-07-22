import { withAuth } from "next-auth/middleware";

// const authRoutes = ["/", "/sign-up"];

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    //console.log(req.nextauth.token);
  },
  {
    callbacks: {
      authorized: ({ token }) => token?.isAdmin === true,
    },
    pages: {
      signIn: "/",
      newUser: "/sign-up",
    },
  },
);

export const config = {
  matcher: [
    "/dashboard/pricing-plan/:path*",
    "/dashboard/features/:path*",
    "/dashboard/fee/:path*",
    "/dashboard/overrate-fee/:path*",
    "/dashboard/subscriptions/:path*",
    "/dashboard/users/:path*",
  ],
};
