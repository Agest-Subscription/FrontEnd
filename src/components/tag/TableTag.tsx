import { useState } from "react";
import { CaretUpOutlined, EllipsisOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, Flex, Tag } from "antd";

import { Permission } from "@/interfaces/model/permission.type";

type Props = {
  permissions: Permission[];
  width?: string;
};

const TableTag = ({ permissions }: Props) => {
  const [isLoadMore, setIsLoadMore] = useState(false);

  const loadMoreData = () => {
    setIsLoadMore(true);
  };

  const hiddenData = () => {
    setIsLoadMore(false);
  };

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
        {isLoadMore
          ? permissions.map((permission) => (
              <Tag key={permission.id} bordered={false}>
                {permission.display_name}
              </Tag>
            ))
          : permissions
            ? permissions.slice(0, 3).map((permission) => (
                <Tag key={permission.id} bordered={false}>
                  {permission.display_name}
                </Tag>
              ))
            : null}
        {permissions ? (
          permissions.length > 3 ? (
            !isLoadMore ? (
              <Button
                size="small"
                type="primary"
                ghost={true}
                style={{ borderColor: "transparent" }}
                icon={<EllipsisOutlined />}
                onClick={loadMoreData}
              />
            ) : (
              <Button
                size="small"
                type="primary"
                ghost={true}
                style={{ borderColor: "transparent" }}
                icon={<CaretUpOutlined />}
                onClick={hiddenData}
              />
            )
          ) : null
        ) : null}
      </Flex>
    </ConfigProvider>
  );
};

export default TableTag;
