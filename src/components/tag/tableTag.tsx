import { ConfigProvider, Flex, Tag } from "antd";

import { Permission } from "@/interfaces/model/permission.type";
import LongText from "../table/LongText";

type Props = {
  permissions: Permission[];
};

const tableTag = ({ permissions }: Props) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorText: "#15ABFF",
          borderRadiusSM: 14,
          fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
          fontSize: 20,
        },
      }}
    >
      <Flex>
        {permissions.map((permission) => (
          <Tag key={permission.id} bordered={false}>
            <LongText text={permission.display_name} centerText width={80} />
          </Tag>
        ))}
      </Flex>
    </ConfigProvider>
  );
};

export default tableTag;
