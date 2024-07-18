import type { ThemeConfig } from "antd";

const themeCustom: ThemeConfig = {
  components: {
    Typography: {
      colorInfoBg: "#2F80ED",
    },
    Menu: {
      darkItemSelectedBg: "red",
      //horizontalItemSelectedBg: "yellow",
    },
  },
};

export default themeCustom;
