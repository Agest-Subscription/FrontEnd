import React, { FC } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Config from "./config";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Subscription",
  description: "Subscription Dashboard for admin",
};

const RootLayout: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html
      lang="en"
      style={{
        height: "100vh",
      }}
    >
      <body
        className={inter.className}
        style={{ padding: 0, margin: 0, height: "100%" }}
      >
        <Config>{children}</Config>
      </body>
    </html>
  );
};

export default RootLayout;
