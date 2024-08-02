import { useMemo } from "react";
import { FieldsData } from "@/interfaces/form";
import { Spin } from "antd";
import { useGetInfiniteUser } from "@/hooks/subscription";
import { SubscriptionFormValues } from "@/interfaces/model/subscription.type";


export const useGenerateFields = () => {
  const {
    data: usersPage,
    fetchNextPage,
    isFetchingNextPage,
    isInitialLoading,
    setSearchTerm,
  } = useGetInfiniteUser({
    page_size: 10,
    is_active: true,
  });

  const fields = useMemo<FieldsData<SubscriptionFormValues>>(() => {
    const mappedEmails = usersPage?.pages.flatMap(page =>
      page.data.data.map(user => ({
        value: user.id,
        label: user.email,
      }))
    ) ?? [];

    return {
      user_id: {
        label: "User ID",
        type: "text",
        componentProps: {
          isRequired: true,
        },
      },
      email: {
        label: "Email",
        type: "select",
        options: mappedEmails,
        componentProps: {
          mode: "multiple",
          isRequired: true,
          filterOption: true,
          optionFilterProp: "label",
          onSearch: (searchTerm) => {
            setSearchTerm(searchTerm);
          },
          onChange: () => setSearchTerm(""),
          allowClear: true,
          onPopupScroll: (event: React.UIEvent<HTMLDivElement>) => {
            const target = event.target as HTMLDivElement;
            if (
              !isFetchingNextPage &&
              target.scrollTop + target.offsetHeight === target.scrollHeight
            ) {
              target.scrollTo(0, target.scrollHeight);

              fetchNextPage();
            }
          },
          dropdownRender: (menu) => (
            <Spin spinning={isFetchingNextPage || isInitialLoading}>
              {menu}
            </Spin>
          ),
        },
      },
      is_cancelled: {
        label: "Is Active",
        type: "singleCheckbox",
      },
    };
  }, [usersPage?.pages,
    setSearchTerm,
    isFetchingNextPage,
    fetchNextPage,
    isInitialLoading,]);
  return fields;
};
