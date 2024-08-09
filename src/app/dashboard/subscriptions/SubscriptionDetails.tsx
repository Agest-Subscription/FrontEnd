import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { Col, Flex, Row } from "antd";
import dayjs from "dayjs";
import { ManipulateType } from "dayjs";

import ButtonV1 from "@/components/button/CustomButton";
import { useFormWrapperCtx } from "@/components/formV2/FormWrapperV2";
import { useCheckFirstTime } from "@/hooks/subscription";
import { SubscriptionFormValues } from "@/interfaces/model/subscription.type";
import { useGoToDashboardTab } from "@/utils/navigate";
interface DetailsProp {
  edit?: boolean;
  disableSaveBtn?: boolean;
  onDelete?: any;
  onSave: any;
}

const SubscriptionDetails: React.FC<DetailsProp> = ({
  edit = false,
  disableSaveBtn = false,
  onDelete,
  onSave,
}) => {
  const goToSubscription = useGoToDashboardTab("subscriptions");
  const { FormField } = useFormWrapperCtx<SubscriptionFormValues>();
  const methods = useFormContext<SubscriptionFormValues>();
  const userId = methods.watch("user_id");
  const pricingPlanId = methods.watch("pricing_plan_id");
  const { data: isAlreadySubscribed, isLoading } = useCheckFirstTime(
    userId,
    pricingPlanId,
  );
  const start_date = methods.watch("start_date");
  const is_cancelled = methods.watch("is_cancelled");

  useEffect(() => {
    const caculateDueDateFreeTrial = () => {
      if (isLoading) return;
      const pricingPlan = methods.getValues("pricing_plan");
      const isFirstTime = isAlreadySubscribed?.data?.is_first_time;
      if (isFirstTime || pricingPlan?.has_free_trial === false) {
        methods.setValue("due_date_free_trial", null);
        return;
      }

      if (!start_date || !pricingPlan || isFirstTime) return;

      const dueDateFreeTrial = dayjs(start_date)
        .add(
          pricingPlan.free_trial_period_count ?? 0,
          pricingPlan.free_trial_period as ManipulateType | undefined,
        )
        .subtract(1, "minute")
        .toISOString();

      methods.setValue("due_date_free_trial", dueDateFreeTrial);
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
    const suspendedDate = () => {
      const is_cancelled = methods.getValues("is_cancelled");
      console.log(is_cancelled);
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
            .subtract(2, "day")
            .toISOString();
          methods.setValue("next_billing_date", next_billing_date);
        }
      }
    };

    caculateDueDateFreeTrial();
    caculateEndDate();
    caculateNextBillingDate();
    suspendedDate();
  }, [isAlreadySubscribed, isLoading, methods, start_date, is_cancelled]);

  return (
    <>
      <Flex
        vertical
        gap={24}
        style={{ border: "1px solid #BDC1CA", padding: "16px" }}
      >
        <Row gutter={24}>
          <Col span={6}>
            <FormField name="user_id" />
          </Col>
          <Col span={6}>
            <FormField name="email" />
          </Col>
          <Col span={6}>
            <FormField name="pricing_plan_id" />
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={6}>
            <FormField name="start_date" />
          </Col>
          <Col span={6}>
            <FormField name="due_date_free_trial" />
          </Col>
          <Col span={6}>
            <FormField name="next_billing_date" />
          </Col>
          <Col span={6}>
            <FormField name="end_date" />
          </Col>
        </Row>
        <Row>
          <Col span={6}>
            <FormField name="is_cancelled" />
          </Col>
          <Col span={6}>
            <FormField name="suspended_date" />
          </Col>
        </Row>
      </Flex>
      <Flex
        style={{ width: "100%" }}
        justify={`${edit ? "space-between" : "flex-end"}`}
      >
        {edit && (
          <ButtonV1 title="Delete" customType="danger" onClick={onDelete} />
        )}
        <Flex gap={12}>
          <ButtonV1
            title="Cancel"
            customType="cancel"
            onClick={() => goToSubscription()}
          />
          <ButtonV1
            title="Save"
            onClick={onSave}
            customDisabled={disableSaveBtn}
          />
        </Flex>
      </Flex>
    </>
  );
};

export default SubscriptionDetails;
