import React from "react";
import { useEffect } from "react";
import { Modal, Button, Flex } from "antd";
import {
  CheckCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { popUpPropType } from "@/interfaces/popup";
import ButtonV1 from "../button/CustomButton";

type Props = {
  popupProps: popUpPropType;
  isOpen: boolean;
  onClose: any;
};

//3 popup types "Success", "Fail", "Confirm"
const PopUp = ({ popupProps, isOpen = false, onClose }: Props) => {
  const formatText = popupProps.popup_text.split("/n");

  const handleEscape = (e: KeyboardEvent) => {
    if (e.keyCode === 27) {
      onClose();
    }
  };

  useEffect(() => {
    return () => document.addEventListener("keydown", handleEscape);
  });

  return (
    <>
      <Modal
        open={isOpen}
        onOk={() => popupProps.onConfirm}
        onCancel={onClose}
        centered
        title={
          popupProps.popup_type === "Success"
            ? [
                <center>
                  <CheckCircleOutlined
                    style={{ fontSize: "30px", color: "#90EE90" }}
                  />
                </center>,
              ]
            : popupProps.popup_type === "Fail"
              ? [
                  <center>
                    <ExclamationCircleOutlined
                      style={{ fontSize: "30px", color: "red" }}
                    />
                  </center>,
                ]
              : []
        }
        footer={
          popupProps.popup_type === "Confirm" && [
            <Flex justify="center" gap={24}>
              <ButtonV1
                customType="cancel"
                key="cancel"
                onClick={onClose}
                customSize="small"
              >
                No
              </ButtonV1>
              <ButtonV1
                key="confirm"
                type="primary"
                onClick={() => {
                  popupProps.onConfirm();
                  onClose();
                }}
                customSize="small"
              >
                Yes
              </ButtonV1>
            </Flex>,
          ]
        }
      >
        <Flex
          vertical
          gap={12}
          style={{
            padding: "30px 0px",
            fontSize: "18px",
            fontWeight: "400",
            color: "#171A1F",
          }}
        >
          <center>
            {formatText.map((line) => (
              <p>{line}</p>
            ))}
          </center>
        </Flex>
      </Modal>
    </>
  );
};

export default PopUp;
