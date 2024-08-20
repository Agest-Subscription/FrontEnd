"use client";
import { Flex, Modal } from "antd";

import ButtonV1 from "@/components/button/CustomButton";
import Invoice from "@/components/invoice/Invoice";

type Props = {
  onCancel: () => void;
  onSave: () => void;
  isModalOpen: boolean;
};

const InvoiceModal: React.FC<Props> = ({ onCancel, onSave, isModalOpen }) => {
  const handleCancel = () => {
    onCancel();
  };

  const handleSave = () => {
    onSave();
  };

  return (
    <Modal
      open={isModalOpen}
      width={1000}
      footer={null}
      closable={false}
      centered
    >
      <Flex vertical gap={24} style={{ padding: "16px" }}>
        <Invoice />
        <Flex gap={24} justify="end">
          <ButtonV1 title="Cancel" customType="cancel" onClick={handleCancel} />
          <ButtonV1 title="Save" onClick={handleSave} />
        </Flex>
      </Flex>
    </Modal>
  );
};

export default InvoiceModal;
