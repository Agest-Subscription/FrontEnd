import React, { useEffect, useMemo, useState } from "react";
import { Col, Flex, Row } from "antd";

import InvoiceModal from "./InvoiceModal";
import useGenerateColumns from "./useGenerateColumns";

import ButtonV1 from "@/components/button/CustomButton";
import { useFormWrapperCtx } from "@/components/formV2/FormWrapperV2";
import TableV1 from "@/components/table/TableV1";
import { useGetListInvoices } from "@/hooks/invoice";
import {
  DataSourceItem,
  TableChangeParams,
  TableParams,
} from "@/interfaces/base";
import {
  InvoiceFilterParams,
  InvoiceFormValues,
  InvoiceTableData,
} from "@/interfaces/model/invoice.type";

interface DetailsProp {
  edit?: boolean;
  disableSaveBtn?: boolean;
  onDelete?: any;
  onSave: any;
}

const InvoiceDetails: React.FC<DetailsProp> = ({ onSave }) => {
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

  const { data: InvoiceTableData, isFetching } = useGetListInvoices(params);
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
    if (!InvoiceTableData) return;
    setTableParams((prev) => {
      const current = prev.pagination.current || 1;
      const pageSize = prev.pagination.pageSize || 5;
      return {
        ...prev,
        pagination: {
          ...prev.pagination,
          total: InvoiceTableData?.total,
          current:
            current > 1 && InvoiceTableData?.total === pageSize * (current - 1)
              ? current - 1
              : current,
        },
      };
    });
  }, [InvoiceTableData]);

  const dataSource = useMemo<DataSourceItem<InvoiceTableData>[]>(() => {
    return (
      InvoiceTableData?.data.map((invoice, index) => ({
        ...invoice,
        key: invoice.id,
        no: index + 1 + ((params.page ?? 1) - 1) * (params?.page_size ?? 5),
      })) ?? []
    );
  }, [InvoiceTableData?.data, params.page, params?.page_size]);

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
              <FormField name="next_billing_date" />
            </Col>
          </Row>
          <ButtonV1
            customBackgroundColor="#17A948"
            onClick={() => setIsModalOpen(true)}
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
        onSave={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default InvoiceDetails;
