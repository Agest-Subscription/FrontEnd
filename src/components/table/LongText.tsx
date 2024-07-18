import React, { useEffect, useRef, useState } from "react";
import { Tooltip } from "antd";

interface LongTextProps {
  text: string | null;
  width?: string | number;
}

const LongText: React.FC<LongTextProps> = ({ text, width = 200 }) => {
  const textRef = useRef<HTMLParagraphElement | null>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    if (textRef.current) {
      const { scrollWidth, clientWidth } = textRef.current;
      setIsOverflowing(scrollWidth > clientWidth);
    }
  }, [text]);

  return (
    <Tooltip title={isOverflowing ? text : ""}>
      <p
        ref={textRef}
        style={{
          textOverflow: "ellipsis",
          overflow: "hidden",
          whiteSpace: "nowrap",
          width: width,
        }}
      >
        {text}
      </p>
    </Tooltip>
  );
};

export default LongText;
