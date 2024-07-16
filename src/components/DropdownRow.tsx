import { FunctionComponent } from "react";
import { Flex } from "antd";

interface DropdownRowConfigItem {
  render: () => JSX.Element;
  span: number;
}

interface DropdownRowProps {
  config: DropdownRowConfigItem[];
  baseSpan?: number;
}

const DropdownRow: FunctionComponent<DropdownRowProps> = ({
  config,
  baseSpan = 12,
}) => {
  return (
    <Flex
     
    >
      {config.map((item, index) => {
        return (
          <Flex
            key={index}
            vertical
            style={{
              width: `${(item.span / baseSpan) * 100}%`,
            }}
          >
            <div
              style={{
                // @ts-ignore
                textWrap: "wrap",
              }}
            >
              {item.render()}
            </div>
          </Flex>
        );
      })}
    </Flex>
  );
};

export default DropdownRow;
