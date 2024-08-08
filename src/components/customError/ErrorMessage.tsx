import React from "react";

interface ErrorMessageProps {
  message?: string;
  index?: number; // Optional if you want to handle index-specific errors
  style?: React.CSSProperties; // Optional for custom styles
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  index,
  style,
}) => {
  if (!message) return null; // If no message, return nothing

  return (
    <span
      style={{
        color: "#ff4d4f",
        paddingLeft: "2px",
        paddingTop: "5px",
        ...style, // Allow overriding default styles
      }}
    >
      {message}
    </span>
  );
};

export default ErrorMessage;
