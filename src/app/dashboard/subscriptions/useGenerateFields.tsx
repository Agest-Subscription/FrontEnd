import { useMemo } from "react";
import { FieldsData } from "@/interfaces/form";
import { Spin } from "antd";
import { useGetInfiniteUser, useGetInfinitePricingPlan } from "@/hooks/subscription";
import { SubscriptionFormValues } from "@/interfaces/model/subscription.type";
import { UseFormReturn } from "react-hook-form";


export const useGenerateFields = (methods: UseFormReturn<SubscriptionFormValues, any, undefined>) => {
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

  const {
    data: pricingPlansPage,
    fetchNextPage: fetchNextPricingPlanPage,
    isFetchingNextPage: isFetchingNextPricingPlanPage,
    isInitialLoading: isInitialLoadingPricingPlans,
    setSearchTerm: setPricingPlanSearchTerm,
  } = useGetInfinitePricingPlan({
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

    const mappedPricingPlans = pricingPlansPage?.pages.flatMap(page =>
      page.data.data.map(pricingPlan => ({
        value: pricingPlan.id,
        label: pricingPlan.name,
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
          isRequired: true,
          filterOption: true,
          optionFilterProp: "label",
          onSearch: (searchTerm) => {
            setUserSearchTerm(searchTerm);
          },
          onChange: (value) => {
            setUserSearchTerm("");
            methods.setValue("user_id",value)
          },
          allowClear: true,
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
      pricing_plan_id: {
        label: "Pricing plan",
        type: "select",
        options: mappedPricingPlans,
        componentProps: {
          isRequired: true,
          filterOption: true,
          optionFilterProp: "label",
          onSearch: (searchTerm) => {
            setPricingPlanSearchTerm(searchTerm);
          },
          onChange: () => {
            setPricingPlanSearchTerm("");
          },
          allowClear: true,
          onPopupScroll: (event: React.UIEvent<HTMLDivElement>) => {
            const target = event.target as HTMLDivElement;
            if (
              !isFetchingNextPricingPlanPage &&
              target.scrollTop + target.offsetHeight === target.scrollHeight
            ) {
              target.scrollTo(0, target.scrollHeight);

              fetchNextPricingPlanPage();
            }
          },
          dropdownRender: (menu) => (
            <Spin spinning={isFetchingNextPricingPlanPage || isInitialLoadingPricingPlans}>
              {menu}
            </Spin>
          ),
        },
      },
      start_date: {
        label: "Start date",
        type: "text",
        componentProps: {
          isRequired: true,
        },
      },
      due_date_free_trial: {
        label: "Due date free trial",
        type: "text",
      },
      next_billing_date: {
        label: "Next billing date",
        type: "text",
      },
       end_date: {
        label: "End date",
        type: "text",
      },
      is_cancelled: {
        label: "Is Active",
        type: "singleCheckbox",
      },
      suspended_date: {
        label: "Suspended date",
        type: "text",
      },
    };
  }, [usersPage?.pages,
    pricingPlansPage?.pages,
    isFetchingNextPricingPlanPage,
    isFetchingNextUserPage,
    isInitialLoadingPricingPlans,
    isInitialLoadingUsers,
    setUserSearchTerm,
    setPricingPlanSearchTerm,
    fetchNextUserPage,
    fetchNextPricingPlanPage,
  ]);

  return fields;
};
