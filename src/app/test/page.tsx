import React from "react";

import Invoice from "@/components/invoice/Invoice";

type Props = {};

const page = (props: Props) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Invoice />
    </div>
  );
};

export default page;
