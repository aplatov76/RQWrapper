import { type UseQueryOptions, type UseQueryResult } from '@tanstack/react-query';

export type BasedUseQueryHookConfiguration<T, U = T> = UseQueryOptions<T, unknown, U>;

type BasedUseQueryHookResult<T> = UseQueryResult<T>;

export type BasedUseQueryHookResultInObject<T> = {
  [K in keyof T]: BasedUseQueryHookResult<T[K]>;
};

// TODO: Для избежания ошибок типизации в Object.values/Object.entries
export type BasedUseQueryHookResultForObjectMethods<
  T,
  K extends keyof T = keyof T,
> =
  | { [K in keyof T]: BasedUseQueryHookResult<T[K]> }
  | ArrayLike<BasedUseQueryHookResult<T[K]>>;

// Входной и выходной типы для useQuery().data
export type QueriesData<U> = { [K in keyof U]: U[K] | undefined };
export type NonNullableQueriesData<U> = { [K in keyof U]: U[K] };
