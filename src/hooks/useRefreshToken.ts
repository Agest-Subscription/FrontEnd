"use client";

import { signOut } from "next-auth/react";

import { axiosClient } from "@/config/axios/client";

export const useRefreshToken = () => {
  console.log("trigger useRefreshToken");

  const refreshToken = async () => {
    try {
      await axiosClient.post("/auth/refresh");
    } catch (error) {
      console.error("Failed to refresh token, signing out...", error);
      await axiosClient.delete("/auth/logout");
      signOut();
    }
  };
  return refreshToken;
};
