import { QueryClientConfig } from "@tanstack/react-query";

const reactQueryConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 3,
      staleTime: 60 * 1000, // 1 minute
    },
  },
};

export default reactQueryConfig;
