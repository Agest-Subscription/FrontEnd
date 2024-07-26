"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import { PERMISSIONS } from "@/constants/routes";
import LoginContainer from "@/containers/login/Login";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "authenticated" && session?.user?.isAdmin) {
    return router.push(PERMISSIONS);
  }
  if (status === "authenticated" && !session?.user?.isAdmin) {
    return router.push("/landing-page");
  }
  return (
    <>
      <LoginContainer />
    </>
  );
}
