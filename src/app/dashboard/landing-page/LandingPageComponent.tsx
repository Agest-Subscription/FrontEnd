import React, { useEffect, useMemo, useState } from "react";
import {
  Control,
  Controller,
  FieldValues,
  UseFieldArrayRemove,
  useFormContext,
} from "react-hook-form";
import { DeleteOutlined } from "@ant-design/icons";
import { Flex, Form, Select, Spin } from "antd";
import { debounce } from "lodash";

import { useGetInfiniteRecurrencePeriod } from "@/hooks/landingPage";
import { useGetInfinitePricingPlans } from "@/hooks/pricingPlan";
import { popUpPropType } from "@/interfaces/popup";
import { capitalize, formatDuration } from "@/utils/string";

type Props = {
  control: Control<FieldValues, any>;
  index: number;
  remove: UseFieldArrayRemove;
  usedPeriods: string[];
  showModal: (popUpProp: popUpPropType) => void;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const LandingPageComponent = ({
  control,
  index,
  remove,
  usedPeriods,
  showModal,
  setOpenModal,
}: Props) => {
  const {
    data: recurrencePeriodPage,
    fetchNextPage: fetchNextRecurrencePeriodPage,
    isFetchingNextPage: isFetchingNextRecurrencePeriodPage,
    isInitialLoading: isInitialLoadingRecurrencePeriod,
    setSearchTerm: setSearchTermRecurrencePeriod,
  } = useGetInfiniteRecurrencePeriod({
    page_size: 10,
  });

  const methods = useFormContext();
  const errors = methods.formState.errors;

  const {
    data: pricingPlanPage,
    fetchNextPage,
    isFetchingNextPage,
    isInitialLoading,
    setSearchTerm,
  } = useGetInfinitePricingPlans({
    page_size: 10,
    is_active: true,
    is_available: true,
    recurrence_period: methods.watch(`landing_page_items.${index}.period`),
  });

  const mappedRecurrencePeriods = useMemo(() => {
    return recurrencePeriodPage?.pages
      .map((page) =>
        page.data.data.map((item) => ({
          value: item.recurrence_period,
          label: formatDuration(item.recurrence_period),
        })),
      )
      .flat();
  }, [recurrencePeriodPage]);

  const [mappedPricingPlans, setMappedPricingPlans] = useState<
    { value: string; label: string; price: string }[]
  >([]);

  useEffect(() => {
    const newOptions = pricingPlanPage?.pages
      .map((page) =>
        page.data.data.map((item) => ({
          value: item.id,
          label: item.name,
          price: item.price.toString(),
        })),
      )
      .flat();
    setMappedPricingPlans(newOptions ?? []);
  }, [pricingPlanPage]);

  const onChangePricingPlan = (value: string, priority: string) => {
    methods.setValue(`landing_page_items.${index}.${priority}`, value);
    clearErrors(priority);
    methods.trigger(`landing_page_items.${index}`);
  };

  const onClearPricingPlan = (priority: string) => {
    methods.setValue(`landing_page_items.${index}.${priority}`, null);
    methods.trigger(`landing_page_items.${index}`);
  };

  const isPeriodEmpty = !methods.watch(`landing_page_items.${index}.period`);
  const handlePeriodChange = (value: string) => {
    if (
      !isPeriodEmpty &&
      (methods.getValues(`landing_page_items.${index}.basic`) != null ||
        methods.getValues(`landing_page_items.${index}.pro`) != null ||
        methods.getValues(`landing_page_items.${index}.premium`) != null)
    ) {
      showModal({
        popup_id: "successpopup",
        popup_text: `${capitalize(
          "Are you sure to change this period?\nThis action will remove your current selection.",
        )}`,
        popup_type: "Confirm",
        onConfirm: () => onConfirm(value),
        onClose: () => setOpenModal(false),
      });
    } else {
      methods.setValue(`landing_page_items.${index}.period`, value);
      methods.setValue(`landing_page_items.${index}.basic`, null);
      methods.setValue(`landing_page_items.${index}.pro`, null);
      methods.setValue(`landing_page_items.${index}.premium`, null);
      clearErrors("period");
      methods.trigger(`landing_page_items.${index}`);
    }
  };

  const handleDeleteComponent = () => {
    showModal({
      popup_id: "successpopup",
      popup_text: `${capitalize("Are you sure to delete this plan?")}`,
      popup_type: "Confirm",
      onConfirm: () => remove(index),
      onClose: () => setOpenModal(false),
    });
  };

  const onConfirm = (value: string) => {
    methods.setValue(`landing_page_items.${index}.period`, value);
    methods.setValue(`landing_page_items.${index}.basic`, null);
    methods.setValue(`landing_page_items.${index}.pro`, null);
    methods.setValue(`landing_page_items.${index}.premium`, null);
  };

  const getFilteredOptions = (currentType: string) => {
    const selectedValues = [
      ...["basic", "pro", "premium"]
        .filter((type) => type !== currentType)
        .map((type) => methods.watch(`landing_page_items.${index}.${type}`)),
    ];

    return mappedPricingPlans.filter(
      (option) => !selectedValues.includes(option.value),
    );
  };

  const getPriceById = (id: string) => {
    const plan = mappedPricingPlans.find((option) => option.value === id);
    const period = methods.watch(`landing_page_items.${index}.period`);

    return plan ? ` $${plan.price}/${formatDuration(period)}` : "";
  };

  const filteredRecurrencePeriods = useMemo(() => {
    return mappedRecurrencePeriods?.filter(
      (period) =>
        !usedPeriods.includes(period.value) ||
        period.value === methods.watch(`landing_page_items.${index}.period`),
    );
  }, [mappedRecurrencePeriods, usedPeriods, methods, index]);

  const onScroll = async (event: React.UIEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement;
    if (
      !isFetchingNextRecurrencePeriodPage &&
      target.scrollTop + target.offsetHeight === target.scrollHeight
    ) {
      target.scrollTo(0, target.scrollHeight);
      fetchNextRecurrencePeriodPage();
    }
  };

  const clearErrors = (field: string) => {
    methods.clearErrors(`landing_page_items.${index}.${field}`);
    methods.clearErrors(`landing_page_items.${index}`);
  };

  return (
    <Flex
      vertical
      gap={6}
      style={{ width: "100%", backgroundColor: "#F3F4F6", padding: "16px" }}
    >
      <Flex justify="space-between">
        <Form.Item
          label={
            <span>
              Period<span style={{ color: "red", marginLeft: "3px" }}>*</span>
            </span>
          }
          validateStatus={
            (errors?.landing_page_items as Record<number, any>)?.[index]?.period
              ? "error"
              : ""
          }
          help={
            (errors?.landing_page_items as Record<number, any>)?.[index]?.period
              ?.message
          }
        >
          <Controller
            name={`landing_page_items.${index}.period`}
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                {...field}
                onChange={(value) => {
                  setSearchTermRecurrencePeriod("");
                  handlePeriodChange(value);
                }}
                onBlur={() =>
                  methods.trigger(`landing_page_items.${index}.period`)
                }
                value={methods.getValues(`landing_page_items.${index}.period`)}
                style={{ width: 200 }}
                options={filteredRecurrencePeriods}
                allowClear={true}
                showSearch={true}
                onSearch={debounce(
                  (value) => setSearchTermRecurrencePeriod(value),
                  500,
                )}
                listHeight={125}
                onPopupScroll={onScroll}
                dropdownStyle={{ maxHeight: 200, overflow: "auto" }}
                dropdownRender={(menu) => (
                  <Spin
                    spinning={
                      isFetchingNextRecurrencePeriodPage ||
                      isInitialLoadingRecurrencePeriod
                    }
                  >
                    {menu}
                  </Spin>
                )}
              />
            )}
          />
        </Form.Item>
        <div style={{ width: 16, height: 18 }}>
          <DeleteOutlined
            style={{ fontSize: 18, color: "#263e56" }}
            onClick={() => handleDeleteComponent()}
          />
        </div>
      </Flex>
      <Flex gap={24}>
        {["basic", "pro", "premium"].map((type) => (
          <Form.Item
            key={type}
            label={type.charAt(0).toUpperCase() + type.slice(1)}
            validateStatus={
              (errors?.landing_page_items as Record<number, any>)?.[index]?.[
                type
              ]
                ? "error"
                : ""
            }
            help={
              (errors?.landing_page_items as Record<number, any>)?.[index]?.[
                type
              ]?.message
            }
          >
            <Controller
              name={`landing_page_items.${index}.${type}`}
              control={control}
              render={({ field }) => (
                <>
                  <Select
                    {...field}
                    filterOption={(input, option) =>
                      option?.label
                        .toLowerCase()
                        .includes(input.toLowerCase()) ?? false
                    }
                    optionFilterProp="label"
                    style={{ width: 200 }}
                    disabled={isPeriodEmpty}
                    onChange={(value) => {
                      onChangePricingPlan(value, type);
                      setSearchTerm("");
                    }}
                    onClear={() => onClearPricingPlan(type)}
                    value={methods.getValues(
                      `landing_page_items.${index}.${type}`,
                    )}
                    allowClear={true}
                    options={getFilteredOptions(type)}
                    listHeight={125}
                    showSearch={true}
                    onSearch={debounce((value) => setSearchTerm(value), 500)}
                    onPopupScroll={(event: React.UIEvent<HTMLDivElement>) => {
                      const target = event.target as HTMLDivElement;
                      if (
                        !isFetchingNextPage &&
                        target.scrollTop + target.offsetHeight ===
                          target.scrollHeight
                      ) {
                        target.scrollTo(0, target.scrollHeight);
                        fetchNextPage();
                      }
                    }}
                    dropdownRender={(menu) => (
                      <Spin spinning={isFetchingNextPage || isInitialLoading}>
                        {menu}
                      </Spin>
                    )}
                  />
                  {methods.watch(`landing_page_items.${index}.${type}`) && (
                    <div
                      style={{
                        fontSize: "13px",
                        fontWeight: "400",
                        lineHeight: "22px",
                        textAlign: "right",
                        paddingTop: "4px",
                        color: "#9095A1",
                      }}
                    >
                      Price:
                      {getPriceById(
                        methods.watch(`landing_page_items.${index}.${type}`),
                      )}
                    </div>
                  )}
                </>
              )}
            />
          </Form.Item>
        ))}
      </Flex>
      {(errors.landing_page_items as Record<number, any>)?.[index] &&
        typeof ((errors.landing_page_items as Record<number, any>) ?? {})[
          index
        ] === "object" &&
        "message" in
          ((errors.landing_page_items as Record<number, any>) ?? {})[index] && (
          <div style={{ color: "red", fontSize: "13px" }}>
            {
              ((errors.landing_page_items as Record<number, any>) ?? {})[index]
                .message as string
            }
          </div>
        )}
    </Flex>
  );
};

export default LandingPageComponent;
