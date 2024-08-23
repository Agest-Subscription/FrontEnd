"use client";
import { Flex, Modal, Spin } from "antd";

import ButtonV1 from "@/components/button/CustomButton";
import Invoice from "@/components/invoice/Invoice";
import { InvoiceDetail } from "@/interfaces/model/invoice.type";

type Props = {
  onCancel: () => void;
  onSave: () => void;
  isModalOpen: boolean;
  invoiceDetailData?: InvoiceDetail | undefined;
  isFetchingInvoiceDetail?: boolean;
};

const InvoiceModal: React.FC<Props> = ({
  onCancel,
  onSave,
  isModalOpen,
  invoiceDetailData,
  isFetchingInvoiceDetail,
}) => {
  const handleCancel = () => {
    onCancel();
  };

  const handleSave = () => {
    onSave();
  };

  return (
    <Spin spinning={isFetchingInvoiceDetail}>
      <Modal
        open={isModalOpen}
        width={1000}
        footer={null}
        closable={false}
        centered
      >
        <Flex vertical gap={24} style={{ padding: "16px" }}>
          <Invoice invoiceDetailData={invoiceDetailData} />
          <Flex gap={24} justify="end">
            <ButtonV1
              title="Cancel"
              customType="cancel"
              onClick={handleCancel}
            />
            <ButtonV1 title="Save" onClick={handleSave} />
          </Flex>
        </Flex>
      </Modal>
    </Spin>
  );
};

export default InvoiceModal;
