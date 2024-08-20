import { useMemo } from "react";
import { Spin } from "antd";
import { debounce } from "lodash";

import { useGetInfiniteUser } from "@/hooks/subscription";
import { FieldsData } from "@/interfaces/form";
import { InvoiceFormValues } from "@/interfaces/model/invoice.type";

export const useGenerateFields = () => {
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

  // const {
  //   data: nextBillingDatesPage,
  //   fetchNextPage: fetchNextNextBillingDatePage,
  //   isFetchingNextPage: isFetchingNextNextBillingDatePage,
  //   isInitialLoading: isInitialLoadingNextBillingDates,
  //   setSearchTerm: setNextBillingDateSearchTerm,
  // } = useGetInfiniteNextBillingDate({
  //   page_size: 10,
  //   is_active: true,
  // });

  const fields = useMemo<FieldsData<InvoiceFormValues>>(() => {
    const mappedEmails =
      usersPage?.pages.flatMap((page) =>
        page.data.data.map((user) => ({
          value: user.id,
          label: user.email,
        })),
      ) ?? [];

    // const mappedNextBillingDates =
    //   nextBillingDatesPage?.pages.flatMap((page) =>
    //     page.data.data.map((user) => ({
    //       value: user.id,
    //       label: user.email,
    //     })),
    //   ) ?? [];

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
          onChange: () => {
            setUserSearchTerm("");
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
      next_billing_date: {
        label: "Next Billing Date",
        type: "select",
        // options: mappedNextBillingDates,
        componentProps: {
          isRequired: true,
          showSearch: true,
          allowClear: true,
          filterOption: true,
          optionFilterProp: "label",
          style: { height: "40px" },
          // onSearch: debounce(
          //   (value) => setNextBillingDateSearchTerm(value),
          //   500,
          // ),
          // onChange: () => {
          //   setNextBillingDateSearchTerm("");
          // },
          // onPopupScroll: (event: React.UIEvent<HTMLDivElement>) => {
          //   const target = event.target as HTMLDivElement;
          //   if (
          //     !isFetchingNextNextBillingDatePage &&
          //     target.scrollTop + target.offsetHeight === target.scrollHeight
          //   ) {
          //     target.scrollTo(0, target.scrollHeight);
          //     fetchNextNextBillingDatePage();
          //   }
          // },
          // dropdownRender: (menu) => (
          //   <Spin
          //     spinning={
          //       isFetchingNextNextBillingDatePage ||
          //       isInitialLoadingNextBillingDates
          //     }
          //   >
          //     {menu}
          //   </Spin>
          // ),
        },
      },
    };
  }, []);
  return fields;
};
