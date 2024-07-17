import React from "react";
import Link from "next/link";
import { Button, Result } from "antd";

import { DashboardTab } from "@/interfaces/base";

type props = {
  previousPage?: DashboardTab;
};
const NotFound: React.FC<props> = ({ previousPage = "permissions" }) => (
  <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={
      <Link href={`/dashboard/${previousPage}`}>
        <Button type="primary">Back Home</Button>
      </Link>
    }
  />
);

export default NotFound;
