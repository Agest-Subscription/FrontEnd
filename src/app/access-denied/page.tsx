"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Button, Result } from "antd";

const DeniedPage = () => {
  const router = useRouter();
  return (
    <Result
      status="403"
      title="403"
      subTitle="Sorry, you are not authorized to access this page."
      extra={
        <Button
          onClick={() => {
            router.push("/");
          }}
          type="primary"
        >
          Back Home
        </Button>
      }
    />
  );
};

export default DeniedPage;
