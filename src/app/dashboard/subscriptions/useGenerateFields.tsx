import { useEffect, useMemo, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { Spin } from "antd";
import dayjs from "dayjs";
import { debounce } from "lodash";

import { DATE_FORMAT_V2 } from "@/constants/date";
import { useGetInfinitePricingPlans } from "@/hooks/pricingPlan";
import { useGetInfiniteUser } from "@/hooks/subscription";
import { FieldsData } from "@/interfaces/form";
import { PricingPlan } from "@/interfaces/model/pricingplan.type";
import { SubscriptionFormValues } from "@/interfaces/model/subscription.type";

export const useGenerateFields = (
  methods: UseFormReturn<SubscriptionFormValues, any, undefined>,
  isEdit: boolean,
  initial_pricingPlan: PricingPlan | null,
  initial_startDate: string | undefined,
) => {
  const [isPricingPlanChange, setIsPricingPlanChange] = useState(false);

  useEffect(() => {
    if (isEdit) {
      methods.setValue("pricing_plan", initial_pricingPlan);
    }
  }, [isEdit, initial_pricingPlan, methods]);

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
  } = useGetInfinitePricingPlans({
    page_size: 10,
    is_active: true,
    is_available: true,
  });

  const fields = useMemo<FieldsData<SubscriptionFormValues>>(() => {
    const mappedEmails =
      usersPage?.pages.flatMap((page) =>
        page.data.data.map((user) => ({
          value: user.id,
          label: user.email,
        })),
      ) ?? [];

    const mappedPricingPlans =
      pricingPlansPage?.pages.flatMap((page) =>
        page.data.data.map((pricingPlan) => ({
          value: pricingPlan.id,
          label: pricingPlan.name,
          pricing_plan: pricingPlan,
        })),
      ) ?? [];

    const checkAlreadyStart = () => {
      const startDate = dayjs(initial_startDate);
      const today = dayjs();
      const isStarted = startDate.isBefore(today);
      return isStarted;
    };

    const keepInitialValue = () => {
      const current_pricing_plan_id = methods.getValues("pricing_plan.id");
      if (
        isEdit &&
        current_pricing_plan_id === initial_pricingPlan?.id &&
        initial_startDate
      ) {
        methods.setValue("start_date", initial_startDate);
        setIsPricingPlanChange(false);
      }
    };

    const getPricingPlanById = (id: string): PricingPlan | null => {
      const item = mappedPricingPlans.find((item) => item.value === id);
      if (item) {
        return {
          ...item.pricing_plan,
          recurrence_fee_id: "0",
          features: [],
        };
      } else return null;
    };

    const assignLocaleTimeForToday = () => {
      const now = dayjs();
      const dayPicker = methods.getValues("start_date");
      if (dayPicker) {
        if (dayPicker.toString() === now.format("YYYY-MM-DD")) {
          methods.setValue("start_date", dayjs().toISOString());
        } else {
          methods.setValue("start_date", dayjs(dayPicker).toISOString());
        }
      }
    };

    return {
      email: {
        label: "Email",
        type: "select",
        options: mappedEmails,
        componentProps: {
          isRequired: true,
          showSearch: true,
          allowClear: true,
          filterOption: true,
          optionFilterProp: "label",
          style: { height: "40px" },
          disabled: isEdit,
          onSearch: debounce((value) => setUserSearchTerm(value), 500),
          onChange: (value) => {
            setUserSearchTerm("");
            methods.setValue("user_id", value);
            keepInitialValue();
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
      pricing_plan_id: {
        label: "Pricing plan",
        type: "select",
        options: mappedPricingPlans,
        componentProps: {
          isRequired: true,
          showSearch: true,
          allowClear: true,
          filterOption: true,
          disabled: checkAlreadyStart(),
          style: { height: "40px" },
          optionFilterProp: "label",
          onSearch: debounce((value) => setPricingPlanSearchTerm(value), 500),
          onChange: (value) => {
            setPricingPlanSearchTerm("");
            methods.setValue("pricing_plan", getPricingPlanById(value) ?? null);
            setIsPricingPlanChange(true);
            methods.setValue("start_date", dayjs().toISOString());

            keepInitialValue();
          },
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
            <Spin
              spinning={
                isFetchingNextPricingPlanPage || isInitialLoadingPricingPlans
              }
            >
              {menu}
            </Spin>
          ),
        },
      },
      start_date: {
        label: "Start date",
        type: "datepicker",
        componentProps: {
          onChange: () => {
            assignLocaleTimeForToday();
          },
          isRequired: true,
          minDate: dayjs(),
          format: DATE_FORMAT_V2,
          disabled: isEdit && !isPricingPlanChange,
        },
      },
      due_date_free_trial: {
        label: "Due date free trial",
        type: "datepicker",
        componentProps: {
          disabled: true,
          format: DATE_FORMAT_V2,
        },
      },
      next_billing_date: {
        label: "Next billing date",
        type: "datepicker",
        componentProps: {
          disabled: true,
          format: DATE_FORMAT_V2,
        },
      },
      end_date: {
        label: "End date",
        type: "datepicker",
        componentProps: {
          disabled: true,
          format: DATE_FORMAT_V2,
        },
      },
      is_cancelled: {
        label: "Suspended",
        type: "singleCheckbox",
        componentProps: {
          disabled: !isEdit,
        },
      },
      suspended_date: {
        label: "Suspended date",
        type: "datepicker",
        componentProps: {
          disabled: true,
          format: DATE_FORMAT_V2,
        },
      },
    };
  }, [
    usersPage?.pages,
    pricingPlansPage?.pages,
    isFetchingNextPricingPlanPage,
    isFetchingNextUserPage,
    isInitialLoadingPricingPlans,
    isInitialLoadingUsers,
    setUserSearchTerm,
    setPricingPlanSearchTerm,
    fetchNextUserPage,
    fetchNextPricingPlanPage,
    isPricingPlanChange,
    setIsPricingPlanChange,
    isEdit,
    methods,
    initial_pricingPlan,
    initial_startDate,
  ]);

  return fields;
};
