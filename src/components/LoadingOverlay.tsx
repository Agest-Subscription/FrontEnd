import { FC } from "react";
import { Image, Typography } from "antd";

interface LoadingOverlayProps {}

const LoadingOverlay: FC<LoadingOverlayProps> = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "fixed",
        flexDirection: "column",
        gap: "0px",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100vw",
        height: "100vh",
        background: "#fff",
      }}
    >
      <Image
        src="/icons/logo.png"
        width={200}
        height={200}
        loading="lazy"
        alt="Federated Service Solutions Logo"
        preview={false}
      />
      <Typography
        style={{
          fontSize: "max(28px,3vw)",
          fontWeight: 600,
          color: "#06417C",
        }}
      >
        Subscription App
      </Typography>
    </div>
  );
};

export default LoadingOverlay;
