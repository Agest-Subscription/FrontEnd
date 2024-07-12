import { ConfigProvider, Flex, Tag } from "antd";

import { Permission } from "@/interfaces/model/permission.type";

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
          fontFamily: "Manrope",
          fontSize: 20,
        },
      }}
    >
      <Flex>
        {permissions.map((permission) => (
          <Tag bordered={false}>{permission.display_name}</Tag>
        ))}
      </Flex>
    </ConfigProvider>
  );
};

export default tableTag;
