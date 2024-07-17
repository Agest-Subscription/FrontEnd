import React from "react";
import { Menu, MenuProps } from "antd";

import "./menuStyle.css";

const MenuCustom: React.FC<MenuProps> = (props) => {
  return <Menu {...props} />;
};

export default MenuCustom;
