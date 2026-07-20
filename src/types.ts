import { type UseQueryOptions, type UseQueryResult } from '@tanstack/react-query';

/**
 * Можно сделать unknown, но в каждом селекте потребуется гвард
 * Можно расширить структуру T до Record<string, {origin: U, target: I}> и использовать UseQueryOptions<U, unknown, I>;
 */
export type BasedUseQueryHookConfiguration<T> = UseQueryOptions<any, unknown, T>;
export type BasedUseQueryHookConfigurations<T> = {[K in keyof T]: BasedUseQueryHookConfiguration<T[K]>};

export type BasedUseQueryHookResult<T> = UseQueryResult<T>;

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
export type QueriesData<U> = { [K in keyof U]: U[K] };
export type NonNullableQueriesData<U> = { [K in keyof U]: U[K] };

/*
 T = Record<string, u>
*/
export type QueryDataTypes<T> = {
  [K in keyof T]: T[K] extends BasedUseQueryHookConfiguration<T[K]> ? T[K] : never;
};