import { useRouter } from "next/navigation";

type DashboardTab =
  | "permissions"
  | "pricing-plan"
  | "subscriptions"
  | "fee"
  | "fee-overate"
  | "features"
  | "users";

export const useGoToDashboardTab = (value: DashboardTab) => {
  const router = useRouter();

  const goToDashboardTab = () => {
    router.push(`/dashboard/${value}`);
  };

  return goToDashboardTab;
};
