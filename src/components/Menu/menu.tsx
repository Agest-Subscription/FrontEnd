import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, MenuProps } from "antd";
import { Header } from "antd/es/layout/layout";
import styled from "styled-components";

import { items } from "./item";

let MenuStyles = () => {
  const urlParams = usePathname();
  // console.log("urlParams: ", urlParams);

  const [current, setCurrent] = useState<string>(`${urlParams}`);

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e.key);
    setCurrent(e.key);
  };
  return (
    <>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          background: "#2F80ED",
          height: "100%",
        }}
      >
        <Menu
          mode="horizontal"
          selectedKeys={[current]}
          items={items}
          onClick={onClick}
          style={{
            flex: 1,
            minWidth: 0,
            backgroundColor: "#2F80ED",
            fontWeight: 700,
            height: "inherit",
            alignItems: "center",
          }}
        />
      </Header>
    </>
  );
};

MenuStyles = styled(MenuStyles)`
  &.ant-menu {
    font-weight: 700;
    background: #b9e5ff;
    display: flex;
    justify-content: space-between;
    text-align: center;
    .ant-menu-item {
      flex: 1;
    }
    .ant-menu-item-selected {
      background: #fff;
    }
    .ant-menu-item-selected:after {
      border-bottom-color: white;
    }
  }
`;

export default MenuStyles;
