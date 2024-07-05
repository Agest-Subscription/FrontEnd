import { Inter } from "next/font/google";
import type { ThemeConfig } from "antd";
const inter = Inter({ subsets: ["latin"] });

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
