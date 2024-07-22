import { NextRequest, NextResponse } from "next/server";
import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
const adminRoutes = [
  "/dashboard/permissions",
  "/dashboard/pricing-plan",
  "/dashboard/features",
  "/dashboard/fee",
  "/dashboard/fee-overate",
  "/dashboard/subscriptions",
  "/dashboard/users",
];

const nonAdminRoutes = [
  "/payment",
  // Add other non-admin specific routes here
];
export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    const token = req.nextauth.token;
    const { pathname } = req.nextUrl.clone();
    console.log("pathname clone,", pathname);

    // Check for admin routes
    if (adminRoutes.some((path) => pathname.startsWith(path))) {
      if (!token?.isAdmin) {
        return NextResponse.redirect(new URL("/access-denied", req.url));
      }

      return NextResponse.next();
    }
  },
  {
    // callbacks: {
    //   authorized: ({ token, req }) => {
    //     const { pathname } = req.nextUrl;
    //     if (token?.isAdmin) {
    //       return true;
    //     }

    //     // if (!token?.isAdmin) {
    //     //   return pathname === "/payment";
    //     // }
    //     return false;
    //   },
    // },
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/",
      newUser: "/sign-up",
    },
  },
);

export const config = {
  matcher: [
    "/payment",
    "/dashboard/permissions/:path*",
    "/dashboard/pricing-plan/:path*",
    "/dashboard/features/:path*",
    "/dashboard/fee/:path*",
    "/dashboard/fee-overate/:path*",
    "/dashboard/subscriptions/:path*",
    "/dashboard/users/:path*",
  ],
};
