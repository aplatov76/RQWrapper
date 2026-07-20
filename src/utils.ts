import { useQueries } from "@tanstack/react-query";
import {
  BasedUseQueryHookConfiguration,
  BasedUseQueryHookConfigurations,
  BasedUseQueryHookResult,
  BasedUseQueryHookResultInObject,
  NonNullableQueriesData,
  QueriesData,
  QueryDataTypes,
} from "./types";
import { RQWrapperQueriesKeys } from "./RQWrapper";

export const isNonNullableQueriesData = <T>(
  data: QueriesData<T>
): data is QueriesData<T> => {
  return Object.values(data).every((queryData) => queryData !== undefined);
};

export const useQueriesStages = <T>(
  queries: BasedUseQueryHookConfigurations<T>,
  isUseCurrentData: boolean
) => {

  const queryValues = Object.values(
    queries as Record<string, BasedUseQueryHookConfiguration<T>>
  );

  const queryKeys = Object.keys(
    queries
  ) as Array<keyof T>;

  const results = useQueries({
    queries: queryValues,
  });

  const queriesData = {} as QueriesData<T>; //T[keyof T];
  
  results.forEach((result, index) => {
    const key = queryKeys[index];
    queriesData[key] = result.data as T[keyof T];
  });


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
