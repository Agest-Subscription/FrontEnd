import React, { useEffect, useMemo, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { Col, Flex, Row } from "antd";

import InvoiceModal from "./InvoiceModal";
import useGenerateColumns from "./useGenerateColumns";

import ButtonV1 from "@/components/button/CustomButton";
import { useFormWrapperCtx } from "@/components/formV2/FormWrapperV2";
import PopUp from "@/components/popup/Popup";
import TableV1 from "@/components/table/TableV1";
import {
  DataSourceItem,
  GetListResponse,
  TableChangeParams,
  TableParams,
} from "@/interfaces/base";
import {
  Invoice,
  InvoiceDetail,
  InvoiceFilterParams,
  InvoiceFormValues,
  InvoiceTableData,
} from "@/interfaces/model/invoice.type";
import { popUpPropType } from "@/interfaces/popup";
import { capitalize } from "@/utils/string";

interface DetailsProp {
  methods: UseFormReturn<InvoiceFormValues, any, undefined>;
  invoicesList: GetListResponse<Invoice> | undefined;
  isFetching?: boolean;
  invoiceDetailData?: InvoiceDetail | undefined;
  isFetchingInvoiceDetail?: boolean;
}

const InvoiceDetails: React.FC<DetailsProp> = ({
  methods,
  invoicesList,
  isFetching,
  invoiceDetailData,
  isFetchingInvoiceDetail,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tableParams, setTableParams] = useState<TableParams<InvoiceTableData>>(
    {
      pagination: {
        current: 1,
        pageSize: 5,
        showSizeChanger: false,
      },
    },
  );

  const params = useMemo<InvoiceFilterParams>(
    () => ({
      page: tableParams.pagination.current,
      page_size: tableParams.pagination?.pageSize,
    }),
    [tableParams.pagination],
  );
  const columns = useGenerateColumns();

  const handleTableChange = ({
    pagination,
    filters,
    sorter,
  }: TableChangeParams<InvoiceTableData>) => {
    if (Array.isArray(sorter)) return;
    setTableParams({
      pagination,
      filters,
      sorter,
    });
  };

  useEffect(() => {
    if (!invoicesList) return;
    setTableParams((prev) => {
      const current = prev.pagination.current || 1;
      const pageSize = prev.pagination.pageSize || 5;
      return {
        ...prev,
        pagination: {
          ...prev.pagination,
          total: invoicesList?.total,
          current:
            current > 1 && invoicesList?.total === pageSize * (current - 1)
              ? current - 1
              : current,
        },
      };
    });
  }, [invoicesList]);

  const dataSource = useMemo<DataSourceItem<InvoiceTableData>[]>(() => {
    return (
      invoicesList?.data.map((invoice, index) => ({
        ...invoice,
        key: invoice.id,
        no: index + 1 + ((params.page ?? 1) - 1) * (params?.page_size ?? 5),
      })) ?? []
    );
  }, [invoicesList?.data, params.page, params?.page_size]);

  const handleOpenModal = async () => {
    const isValid = await methods.trigger();
    if (isValid) {
      setIsModalOpen(true);
    }
  };

  const [modalProp, setModalProp] = useState<popUpPropType>({
    popup_id: "successpopup",
    popup_text: `${capitalize("Are you sure to this invoice to the customer?")}`,
    popup_type: "Confirm",
    onConfirm: () => setOpenModal(false),
    onClose: () => setOpenModal(false),
  });

  function showModal(modalProp: popUpPropType) {
    setModalProp(modalProp);
    setOpenModal(true);
  }

  const onSubmit = async () => {
    setOpenModal(false);
    setTimeout(() => {
      showModal({
        popup_id: "successpopup",
        popup_text: `${capitalize("This invoice has been sent to the customer.")}`,
        popup_type: "Success",
        onConfirm: () => setOpenModal(false),
        onClose: () => setOpenModal(false),
      });
    }, 100);
  };

  const handleSave = async () => {
    showModal({
      popup_id: "confirm",
      popup_text: `${capitalize("Are you sure to send this invoice to the customer?")}`,
      popup_type: "Confirm",
      onConfirm: () => {
        onSubmit();
      },
      onClose: () => setOpenModal(false),
    });
  };

  const { FormField } = useFormWrapperCtx<InvoiceFormValues>();
  return (
    <>
      <Flex
        vertical
        gap={24}
        style={{ border: "1px solid #BDC1CA", padding: "16px" }}
      >
        <Flex justify="space-between">
          <Row gutter={24} style={{ width: "100%" }}>
            <Col span={6}>
              <FormField name="user_id" />
            </Col>
            <Col span={6}>
              <FormField name="subs_next_billing_date" />
            </Col>
          </Row>
          <ButtonV1
            customBackgroundColor="#17A948"
            onClick={() => handleOpenModal()}
          >
            View Invoice
          </ButtonV1>
        </Flex>
        <TableV1
          scroll={{ x: "max-content" }}
          loading={isFetching}
          tableTitle="invoice"
          columns={columns}
          dataSource={dataSource}
          onChange={(pagination, filters) =>
            handleTableChange({ pagination, filters })
          }
          pagination={tableParams.pagination}
        />
      </Flex>
      <InvoiceModal
        isModalOpen={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onSave={() => handleSave()}
        invoiceDetailData={invoiceDetailData}
        isFetchingInvoiceDetail={isFetchingInvoiceDetail}
      />
      <PopUp popupProps={modalProp} isOpen={openModal} />
    </>
  );
};

export default InvoiceDetails;
