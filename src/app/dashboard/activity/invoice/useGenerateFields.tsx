import { useMemo, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { Spin } from "antd";
import { debounce } from "lodash";

import { useGetInfiniteUser } from "@/hooks/subscription";
import { FieldsData } from "@/interfaces/form";
import {
  InvoiceFormValues,
  NextBillingDate,
} from "@/interfaces/model/invoice.type";

export const useGenerateFields = (
  methods: UseFormReturn<InvoiceFormValues, any, undefined>,
  nextBillingDateList: NextBillingDate[],
) => {
  const [, setSelectedUserId] = useState<string | null>(null);

  const {
    data: usersPage,
    fetchNextPage: fetchNextUserPage,
    isFetchingNextPage: isFetchingNextUserPage,
    isInitialLoading: isInitialLoadingUsers,
    setSearchTerm: setUserSearchTerm,
  } = useGetInfiniteUser({
    page_size: 10,
    is_active: true,
  });

  const fields = useMemo<FieldsData<InvoiceFormValues>>(() => {
    const mappedEmails =
      usersPage?.pages.flatMap((page) =>
        page.data.data.map((user) => ({
          value: user.id,
          label: user.email,
        })),
      ) ?? [];

    const mappedNextBillingDates =
      nextBillingDateList?.map((bill) => ({
        value: bill.date,
        label: bill.date,
      })) ?? [];

    return {
      user_id: {
        label: "User",
        type: "select",
        options: mappedEmails,
        componentProps: {
          isRequired: true,
          showSearch: true,
          allowClear: true,
          filterOption: true,
          optionFilterProp: "label",
          style: { height: "40px" },
          onSearch: debounce((value) => setUserSearchTerm(value), 500),
          onChange: (value) => {
            setUserSearchTerm("");
            setSelectedUserId(value);
          },
          onPopupScroll: (event: React.UIEvent<HTMLDivElement>) => {
            const target = event.target as HTMLDivElement;
            if (
              !isFetchingNextUserPage &&
              target.scrollTop + target.offsetHeight === target.scrollHeight
            ) {
              target.scrollTo(0, target.scrollHeight);
              fetchNextUserPage();
            }
          },
          dropdownRender: (menu) => (
            <Spin spinning={isFetchingNextUserPage || isInitialLoadingUsers}>
              {menu}
            </Spin>
          ),
        },
      },
      subs_next_billing_date: {
        label: "Next Billing Date",
        type: "select",
        options: mappedNextBillingDates,
        componentProps: {
          allowClear: true,
          style: { height: "40px" },
        },
      },
    };
  }, [
    fetchNextUserPage,
    isFetchingNextUserPage,
    isInitialLoadingUsers,
    nextBillingDateList,
    setUserSearchTerm,
    usersPage?.pages,
  ]);
  return fields;
};
