import { useMemo } from "react";
import { UseFormReturn } from "react-hook-form";
import { Spin } from "antd";
import dayjs from "dayjs";
import { debounce } from "lodash";

import { DATE_FORMAT_V2 } from "@/constants/date";
import { useGetInfiniteUser } from "@/hooks/subscription";
import { FieldsData } from "@/interfaces/form";
import { ActivityFormValues } from "@/interfaces/model/activity.type";
import { FeaturePlanFee } from "@/interfaces/model/pricingplan.type";
import { SubscriptionResponseItem } from "@/interfaces/model/subscription.type";

export const useGenerateFields = (
  methods: UseFormReturn<ActivityFormValues, any>,
  subscriptionsData: SubscriptionResponseItem[],
  featuresData: FeaturePlanFee[],
): FieldsData<ActivityFormValues> => {
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

  const fields = useMemo<FieldsData<ActivityFormValues>>(() => {
    const mappedEmails =
      usersPage?.pages.flatMap((page) =>
        page.data.data.map((user) => ({
          value: user.id,
          label: user.email,
        })),
      ) ?? [];

    const pickPricingPlanId = (id: string) => {
      const currentSubscription = subscriptionsData.find((s) => s.id === id);
      if (currentSubscription) {
        const end_date = currentSubscription.end_date;
        const start_date = currentSubscription.start_date;
        if (end_date && start_date) {
          methods.setValue(
            "start_date",
            dayjs(start_date).format(DATE_FORMAT_V2),
          );
          methods.setValue("end_date", dayjs(end_date).format(DATE_FORMAT_V2));
        }
        return currentSubscription?.pricing_plan?.id;
      }
    };

    const mappedSubscriptions =
      subscriptionsData?.map((subscription) => ({
        value: subscription.id,
        label: subscription?.pricing_plan?.name ?? "",
      })) ?? [];

    const mappedFeatures =
      featuresData?.map((feature) => ({
        value: feature.id,
        label: feature.feature.name,
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
      subscription_id: {
        label: "Pricing plan",
        type: "select",
        options: mappedSubscriptions,
        componentProps: {
          allowClear: true,
          style: { height: "40px" },
          onChange: (value) => {
            setUserSearchTerm("");
            const currentPricingPlanId = pickPricingPlanId(value);
            if (currentPricingPlanId) {
              methods.setValue("pricing_plan", currentPricingPlanId);
            }
          },
        },
      },
      start_date: {
        label: "Start date",
        type: "text",
        componentProps: {
          disabled: true,
        },
      },
      end_date: {
        label: "End date",
        type: "text",
        componentProps: {
          disabled: true,
        },
      },
      description: {
        label: "Description",
        type: "textarea",
        componentProps: {
          rows: 3,
          style: { width: "100%" },
        },
      },
      "feature_plan_fee_activities.[].feature_plan_fee_id": {
        label: "Feature",
        type: "select",
        options: mappedFeatures,
        componentProps: {
          allowClear: true,
        },
      },
      "feature_plan_fee_activities.[].quantity": {
        label: "Quantity",
        type: "text",
        componentProps: {
          isRequired: true,
          min: 1,
          type: "number",
        },
      },
      "feature_plan_fee_activities.[].activity_date": {
        label: "Activity date",
        type: "datepicker",
        componentProps: {
          disabled: true,
          format: DATE_FORMAT_V2,
        },
      },
      "feature_plan_fee_activities.[].fee": {
        label: "Fee",
        type: "text",
        componentProps: {
          disabled: true,
        },
      },
      "feature_plan_fee_activities.[].fee_type": {
        label: "Fee type",
        type: "text",
        componentProps: {
          disabled: true,
        },
      },
    };
  }, [
    methods,
    subscriptionsData,
    featuresData,
    usersPage?.pages,
    fetchNextUserPage,
    isFetchingNextUserPage,
    isInitialLoadingUsers,
    setUserSearchTerm,
  ]);
  return fields;
};
