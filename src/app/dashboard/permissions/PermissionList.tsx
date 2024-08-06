import { useEffect, useMemo, useState } from "react";

import useGenerateColumns from "./useGenerateColumns";

import PopUp from "@/components/popup/Popup";
import TableV1 from "@/components/table/TableV1";
import { useAddPermission, useGetListPermission } from "@/hooks/permission";
import useSearchSync from "@/hooks/useSearchSync";
import {
  CustomError,
  DataSourceItem,
  TableChangeParams,
  TableParams,
} from "@/interfaces/base";
import {
  PermissionFilterParams,
  PermissionTableData,
} from "@/interfaces/model/permission.type";
import { popUpPropType } from "@/interfaces/popup";
import { getErrorDetail } from "@/utils/error";
import { capitalize } from "@/utils/string";

type Props = {};

const PermissionList: React.FC<Props> = () => {
  const { mutate: addPermission, isLoading: isAdding } = useAddPermission();

  const [tableParams, setTableParams] = useState<
    TableParams<PermissionTableData>
  >({
    pagination: {
      current: 1,
      pageSize: 5,
      showSizeChanger: false,
    },
  });

  function resetPagination() {
    setTableParams((prev) => ({
      ...prev,
      pagination: {
        ...prev.pagination,
        current: 1,
      },
    }));
  }

  const { searchQuery, handleSearch } = useSearchSync(resetPagination);

  const [openModal, setOpenModal] = useState(false);
  const [modalProp, setModalProp] = useState<popUpPropType>({
    popup_id: "successpopup",
    popup_text: `${capitalize("Are you sure to add new permissions to this table?")}`,
    popup_type: "Confirm",
    onConfirm: () => onAddPermissons(),
    onClose: () => setOpenModal(false),
  });
  const [addPermissionModalProp] = useState<popUpPropType>(modalProp);

  function showModal(modalProp: popUpPropType, open = true) {
    setModalProp(modalProp);
    setOpenModal(open);
  }

  function onAddPermissons() {
    addPermission(undefined, {
      onSuccess: () => {
        showModal({
          popup_id: "successpopup",
          popup_text: `${capitalize("This permission table is successfully updated.")}`,
          popup_type: "Success",
          onConfirm: () => setModalProp(addPermissionModalProp),
          onClose: () => showModal(addPermissionModalProp, false),
        });
      },
      onError: (err: CustomError) => {
        showModal({
          popup_id: "fail",
          popup_text: `${getErrorDetail(err) ?? "The system cannot update this permission table!"}`,
          popup_type: "Fail",
          onConfirm: () => setModalProp(addPermissionModalProp),
          onClose: () => showModal(addPermissionModalProp, false),
        });
      },
    });
  }

  const params = useMemo<PermissionFilterParams>(
    () => ({
      page: tableParams.pagination.current,
      page_size: tableParams.pagination?.pageSize,
      search: searchQuery,
    }),
    [searchQuery, tableParams.pagination],
  );

  const { data: PermissionTableData, isFetching } =
    useGetListPermission(params);
  const columns = useGenerateColumns();

  const handleTableChange = ({
    pagination,
    filters,
    sorter,
  }: TableChangeParams<PermissionTableData>) => {
    if (Array.isArray(sorter)) return;
    setTableParams({
      pagination,
      filters,
      sorter,
    });
  };

  useEffect(() => {
    if (!PermissionTableData) return;
    setTableParams((prev) => {
      const current = prev.pagination.current || 1;
      const pageSize = prev.pagination.pageSize || 5;
      return {
        ...prev,
        pagination: {
          ...prev.pagination,
          total: PermissionTableData?.total,
          current:
            current > 1 &&
            PermissionTableData?.total === pageSize * (current - 1)
              ? current - 1
              : current,
        },
      };
    });
  }, [PermissionTableData]);

  const dataSource = useMemo<DataSourceItem<PermissionTableData>[]>(() => {
    return (
      PermissionTableData?.data.map((permission, index) => ({
        ...permission,
        key: permission.id,
        no: index + 1 + ((params.page ?? 1) - 1) * (params?.page_size ?? 5),
      })) ?? []
    );
  }, [PermissionTableData?.data, params.page, params?.page_size]);

  return (
    <div>
      <TableV1
        scroll={{ x: "max-content" }}
        loading={isFetching || isAdding}
        tableTitle="permission"
        showSearchBar={true}
        columns={columns}
        dataSource={dataSource}
        onChange={(pagination, filters) =>
          handleTableChange({ pagination, filters })
        }
        pagination={tableParams.pagination}
        addItem={() => showModal(modalProp)}
        onSearch={handleSearch}
        searchValue={searchQuery}
      />
      <PopUp popupProps={modalProp} isOpen={openModal} />
    </div>
  );
};

export default PermissionList;
