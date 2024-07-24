import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";
const adminRoutes = [
  "/dashboard/permissions",
  "/dashboard/pricing-plan",
  "/dashboard/features",
  "/dashboard/fee",
  "/dashboard/fee-overate",
  "/dashboard/subscriptions",
  "/dashboard/users",
];

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  async function middleware(req) {
    const res = NextResponse.next();
    const token = req.nextauth.token;
    const { pathname } = req.nextUrl.clone();
    const accessToken = "Bearer " + token?.access_token;

    res.cookies.set({
      name: "access_token",
      value: accessToken,
      path: "/",
      httpOnly: true,
      sameSite: "lax",
    });
    res.cookies.set({
      name: "refresh_token",
      value: token?.refresh_token as string,
      path: "/",
      httpOnly: true,
      sameSite: "lax",
    });

    // Check for admin routes
    if (adminRoutes.some((path) => pathname.startsWith(path))) {
      if (!token?.isAdmin) {
        return NextResponse.redirect(new URL("/access-denied", req.url));
      }
      return res;
    }
    return res;
  },
  {
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
    "/dashboard/overrate-fee/:path*",
    "/dashboard/subscriptions/:path*",
    "/dashboard/users/:path*",
  ],
};
