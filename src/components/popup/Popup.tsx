import React, { useEffect } from "react";
import {
  CheckCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { Flex, Modal } from "antd";

import ButtonV1 from "../button/CustomButton";

import { popUpPropType } from "@/interfaces/popup";

type Props = {
  popupProps: popUpPropType;
  isOpen: boolean;
};

//3 popup types "Success", "Fail", "Confirm"
const PopUp = ({ popupProps, isOpen = false }: Props) => {
  const formatText = popupProps.popup_text.split("\n");

  useEffect(() => {
    const handleEscape: any = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        popupProps.onClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [popupProps, popupProps.onClose]);

  return (
    <Modal
      open={isOpen}
      onOk={popupProps.onConfirm}
      onCancel={popupProps.onClose}
      centered
      title={
        popupProps.popup_type === "Success"
          ? [
              <center key="success">
                <CheckCircleOutlined
                  style={{ fontSize: "30px", color: "#90EE90" }}
                />
              </center>,
            ]
          : popupProps.popup_type === "Fail"
            ? [
                <center key="fail">
                  <ExclamationCircleOutlined
                    style={{ fontSize: "30px", color: "red" }}
                  />
                </center>,
              ]
            : []
      }
      footer={
        popupProps.popup_type === "Confirm" && (
          <Flex justify="center" gap={24}>
            <ButtonV1
              customType="cancel"
              key="cancel"
              onClick={popupProps.onClose}
              customSize="small"
            >
              No
            </ButtonV1>
            <ButtonV1
              key="confirm"
              type="primary"
              onClick={() => {
                popupProps.onConfirm();
                popupProps.onClose();
              }}
              customSize="small"
            >
              Yes
            </ButtonV1>
          </Flex>
        )
      }
    >
      <Flex
        vertical
        gap={12}
        style={{
          paddingBottom: "30px",
          fontSize: "18px",
          fontWeight: "400",
          color: "#171A1F",
        }}
      >
        <center>
          {formatText.map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </center>
      </Flex>
    </Modal>
  );
};

export default PopUp;
