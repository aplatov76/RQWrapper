import { useQueries } from "@tanstack/react-query";
import {
  BasedUseQueryHookConfiguration,
  NonNullableQueriesData,
} from "./types";
import { RQWrapperQueriesKeys } from "./RQWrapper";

export const isNonNullableQueriesData = <T, U>(
  data: Record<RQWrapperQueriesKeys<T, U>, U>
): data is Record<RQWrapperQueriesKeys<T, U>, NonNullableQueriesData<U>> => {
  return Object.values(data).every((queryData) => queryData !== undefined);
};

export const useQueriesStages = <T, U>(
  queries: Record<RQWrapperQueriesKeys<T, U>, BasedUseQueryHookConfiguration<T, U>>,
  isUseCurrentData: boolean
) => {

  const queryValues = Object.values(
    queries as Record<string, BasedUseQueryHookConfiguration<T, U>>
  );

  const queryKeys = Object.keys(
    queries as Record<string, BasedUseQueryHookConfiguration<T, U>>
  ) as Array<RQWrapperQueriesKeys<T, U>>;

  const results = useQueries({
    queries: queryValues,
  });

  const queriesData = results.reduce<Record<RQWrapperQueriesKeys<T, U>, NonNullableQueriesData<U>>>((acc, el, index) => {
    acc[queryKeys[index]] = el.data as NonNullableQueriesData<U>;

    return acc;
  }, <Record<RQWrapperQueriesKeys<T, U>, NonNullableQueriesData<U>>>{});

  const isSuccess = results.every((query) => query.isSuccess);
  const isLoading = results.some((query) => query.isLoading);
  const isFetching = results.some((query) => query.isFetching);
  const isError = results.some((query) => query.isError);

  return {
    queriesData,
    isSuccess,
    isLoading,
    isFetching,
    isError,
  };
};
