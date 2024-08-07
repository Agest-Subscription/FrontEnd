import { ConfigProvider, Flex, Tag } from "antd";

import { Permission } from "@/interfaces/model/permission.type";

type Props = {
  permissions: Permission[];
  width?: string;
};

const PermissionColumn = ({ permissions }: Props) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorText: "#15ABFF",
          borderRadiusSM: 14,
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, " +
            "'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', " +
            "'Noto Color Emoji'",
          fontSize: 20,
        },
      }}
    >
      <Flex wrap gap="small" style={{ width: "100%" }}>
        {permissions.map((permission) => (
          <Tag key={permission.id} bordered={false}>
            {permission.display_name}
          </Tag>
        ))}
      </Flex>
    </ConfigProvider>
  );
};

export default PermissionColumn;
