import React from "react";
import { Flex, Typography } from "antd";

type Props = {};

const Login = (props: Props) => {
  return (
    <Flex
      vertical
      gap={8}
      style={{
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        padding: "24px",
        borderRadius: "8px",
      }}
    >
      <Typography style={{ fontWeight: 700, fontSize: 32 }}>Sign In</Typography>
    </Flex>
  );
};
export default Login;
