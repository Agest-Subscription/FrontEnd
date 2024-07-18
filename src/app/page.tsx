"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import { PERMISSIONS } from "@/constants/routes";
import LoginContainer from "@/containers/login/Login";

export default function Home() {
  const { status } = useSession();
  const router = useRouter();

  if (status === "authenticated") {
    return router.push(PERMISSIONS);
  }
  return (
    <>
      <LoginContainer />
    </>
  );
}
