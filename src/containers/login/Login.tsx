"use client";
import React, { useState } from "react";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import styled from "styled-components";

import Loader from "@/components/Loader/Loader";
import LoadingBtn from "@/components/LoadingBtn/Loading";
import LoadingOverlay from "@/components/LoadingOverlay";
import { LoginModel } from "@/interfaces/login";
import { passwordPattern } from "@/utils/RexPattern";

const StyledFormContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 16rem;
  padding: 2.5rem 1.5rem;
  box-shadow: 0 0 50px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  height: 510px;
  width: 370px;
  background-color: #fff;
  z-index: 20;
  .auth__title {
    text-align: center;
    margin-bottom: 9px;
  }

  .auth__error {
    color: red;
  }

  .auth__btn {
    width: 100%;
  }
`;

const LoginContainer = () => {
  const { status } = useSession();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleSubmit = async (data: LoginModel) => {
    try {
      setLoading(true);
      const res = await signIn("credentials", {
        email: data?.email as string,
        password: data?.password as string,
        redirect: false,
      });
      setLoading(false);

      if (!res?.error) {
        setError("");
        if (status === "loading") {
          return <Loader fullScreen spinning={true} />;
        }
      } else {
        setError(res?.error);
      }
    } catch (error: any) {
      setLoading(false);
      setError(error?.message);
    }
  };
  if (status === "loading") {
    return <LoadingOverlay />;
  }
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundImage: "url(/icons/mountains.jpg)",
        backgroundPosition: "center",
      }}
    >
      <StyledFormContainer>
        <Form onFinish={handleSubmit}>
          <h1 className="auth__title">Sign in</h1>

          <Form.Item
            name="email"
            validateTrigger="onSubmit"
            rules={[
              {
                required: true,
                message: "Email is required",
              },
              {
                type: "email",
                message: "Email is not valid",
              },
            ]}
          >
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="Email"
              name="email"
            />
          </Form.Item>

          <Form.Item
            name="password"
            validateTrigger="onSubmit"
            rules={[
              {
                required: true,
                message: "Password is required",
              },
              {
                pattern: passwordPattern,
                message: `Invalid password at least 8 characters long, 
                  one special character and one number`,
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Password"
              autoComplete="password"
              name="password"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="auth__btn"
              // disabled={loading}
              disabled={loading ? true : false}
            >
              {loading ? <LoadingBtn userState={status} /> : "Sign in"}
            </Button>
          </Form.Item>

          {/* Error handling example */}
          {status === "unauthenticated" && (
            <p className="auth__error">{error}</p>
          )}

          <p>
            Don&apos;t have an account? <Link href="/register">Click here</Link>
          </p>
        </Form>
      </StyledFormContainer>
    </div>
  );
};

export default LoginContainer;
