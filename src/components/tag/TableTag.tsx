import { useState } from "react";
import { CaretUpOutlined, EllipsisOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, Flex, Tag } from "antd";

import LongText from "../table/LongText";

import { Permission } from "@/interfaces/model/permission.type";

type Props = {
  permissions: Permission[];
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
                <LongText
                  text={permission.display_name}
                  centerText
                  width={80}
                />
              </Tag>
            ))
          : permissions.slice(0, 3).map((permission) => (
              <Tag key={permission.id} bordered={false}>
                <LongText
                  text={permission.display_name}
                  centerText
                  width={150}
                />
              </Tag>
            ))}
        {permissions.length > 3 ? (
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
        ) : null}
      </Flex>
    </ConfigProvider>
  );
};

export default TableTag;
