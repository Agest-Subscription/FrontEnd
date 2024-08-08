import { useEffect, useMemo, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { Spin } from "antd";
import dayjs from "dayjs";
import { ManipulateType } from "dayjs";
import { debounce } from "lodash";

import { DATE_FORMAT_V2 } from "@/constants/date";
import {
  useCheckFirstTime,
  useGetInfinitePricingPlan,
  useGetInfiniteUser,
} from "@/hooks/subscription";
import { FieldsData } from "@/interfaces/form";
import { PricingPlan } from "@/interfaces/model/pricingplan.type";
import { SubscriptionFormValues } from "@/interfaces/model/subscription.type";

export const useGenerateFields = (
  methods: UseFormReturn<SubscriptionFormValues, any, undefined>,
  isEdit: boolean,
  pricingPlan: PricingPlan | null,
) => {
  const [isPricingPlanChange, setIsPricingPlanChange] = useState(false);

  if (isEdit) {
    methods.setValue("pricing_plan", pricingPlan);
  }

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
    const suspendedDate = () => {
      const is_cancelled = methods.getValues("is_cancelled");
      if (is_cancelled) {
        methods.setValue("suspended_date", dayjs().toISOString());
        methods.setValue("next_billing_date", null);
      } else {
        methods.setValue("suspended_date", null);
        caculateNextBillingDate();
      }
    };

    const caculateNextBillingDate = () => {
      const pricingPlan = methods.getValues("pricing_plan");
      const end_date = methods.getValues("end_date");

      if (end_date && pricingPlan && pricingPlan.recurrence_period) {
        const recurrence_period = pricingPlan.recurrence_period.split(" ");
        const recurrence_cycle = Number(recurrence_period[0]);
        const recurrence_type = recurrence_period[1];

        if (recurrence_cycle === 2 && recurrence_type === "day") {
          const next_billing_date = dayjs(end_date)
            .subtract(1, "day")
            .toISOString();
          methods.setValue("next_billing_date", next_billing_date);
        } else if (recurrence_cycle === 1 && recurrence_type === "day") {
          methods.setValue("next_billing_date", null);
        } else {
          const next_billing_date = dayjs(end_date)
            .add(
              recurrence_cycle,
              recurrence_type as ManipulateType | undefined,
            )
            .subtract(2, "day")
            .toISOString();
          methods.setValue("next_billing_date", next_billing_date);
        }
      }
    };

    const caculateEndDate = () => {
      const pricingPlan = methods.getValues("pricing_plan");
      const start_date = methods.getValues("start_date");
      const due_date_free_trial = methods.getValues("due_date_free_trial");

      if (start_date && pricingPlan && pricingPlan.recurrence_period) {
        const recurrence_period = pricingPlan?.recurrence_period.split(" ");
        const recurrence_cycle = Number(recurrence_period[0]);
        const recurrence_type = recurrence_period[1];

        if (due_date_free_trial) {
          const end_date = dayjs(due_date_free_trial)
            .add(
              recurrence_cycle,
              recurrence_type as ManipulateType | undefined,
            )
            .subtract(1, "minute")
            .toISOString();
          methods.setValue("end_date", end_date);
        } else {
          const end_date = dayjs(start_date)
            .add(
              recurrence_cycle,
              recurrence_type as ManipulateType | undefined,
            )
            .subtract(1, "minute")
            .toISOString();
          methods.setValue("end_date", end_date);
        }
      }
    };

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

    const getPricingPlanById = (id: string): PricingPlan | null => {
      const item = mappedPricingPlans.find((item) => item.value === id);
      return item?.pricing_plan ?? null;
    };
    const assignLocaleTimeForToday = () => {
      const now = dayjs();
      const dayPicker = methods.getValues("start_date");
      if (dayPicker.toString() === now.format("YYYY-MM-DD")) {
        methods.setValue("start_date", dayjs().toISOString());
      }
      methods.setValue("start_date", dayjs(dayPicker).toISOString());
    };

    return {
      user_id: {
        label: "User ID",
        type: "text",
        componentProps: {
          isRequired: true,
          disabled: true,
          style: { height: "40px" },
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
          style: { height: "40px" },
          onSearch: debounce((value) => setUserSearchTerm(value), 500),
          onChange: (value) => {
            setUserSearchTerm("");
            methods.setValue("user_id", value);
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
          style: { height: "40px" },
          optionFilterProp: "label",
          onSearch: debounce((value) => setPricingPlanSearchTerm(value), 500),
          onChange: (value) => {
            setPricingPlanSearchTerm("");
            methods.setValue("pricing_plan", getPricingPlanById(value) ?? null);
            setIsPricingPlanChange(true);
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
        label: "Is Cancelled",
        type: "singleCheckbox",
        componentProps: {
          disabled: !isEdit,
          onChange: () => {
            suspendedDate();
          },
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
  ]);

  return fields;
};
