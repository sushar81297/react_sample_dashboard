import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";

import type { AxiosError } from "axios";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
  queryCache: new QueryCache({
    onError: (error) => {
      console.log(error);
      // store.dispatch(updateLoading(false));
      // store.dispatch(setIsErrorModal(true));
    },
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      console.log(error);
    },
  }),
});

declare module "@tanstack/react-query" {
  interface Register {
    defaultError: AxiosError;
  }
}
