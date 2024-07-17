import { QueryClientConfig } from "@tanstack/react-query";

const reactQueryConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0,
      staleTime: 60 * 1000, // 1 minute
    },
  },
};

export default reactQueryConfig;
