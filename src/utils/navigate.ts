import { useRouter } from "next/navigation";

import { DashboardTab } from "@/interfaces/base";

export const useGoToDashboardTab = (value: DashboardTab) => {
  const router = useRouter();

  const goToDashboardTab = () => {
    router.push(`/dashboard/${value}`);
  };

  return goToDashboardTab;
};
