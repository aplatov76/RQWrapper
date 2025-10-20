import React, { type ElementType, type ReactNode } from 'react';

import clsx from 'clsx';

import { RQChildrenWrapper } from './RQChildrenWrapper';

import {
  BasedUseQueryHookConfiguration,
  type NonNullableQueriesData,
} from './types';
import { isNonNullableQueriesData, useQueriesStages } from './utils';

import styles from './RQWrapper.module.css';

export type RQWrapperQueriesKeys<T, U> = keyof RQWrapperProps<T, U>['queries'];

export interface RQWrapperProps<T, U> {
  /** className для дополнительной стилизации в состоянии isLoading/isError */
  className?: string;
  /** Стили блока children-компонента */
  blockClassName: string;
  /** Кастомный тег для children-компонента. По дефолту div */
  as?: ElementType;
  /** Результаты вызова useQuery, обернутые в объект */
  queries: Record<string, BasedUseQueryHookConfiguration<T, U>>;
  /** Функция, позволяющая передать NonNullable данные из useQuery */
  //children: (queriesData: NonNullableQueriesData<U>) => ReactNode;
  children: (
    queriesData: Record<RQWrapperQueriesKeys<T, U>, NonNullableQueriesData<U>>
  ) => ReactNode;
  //keyof RtkWrapperProps<T, U>['queries']
  loader: ReactNode;
  error: ReactNode;
  /** Ждать данные из текущего запроса или можно показывать предыдущие на время загрузки? */
  isUseCurrentData?: boolean;
}

/**
 * Обертка для проверки useQuery().data !== undefined и обработки состояний isSuccess/isLoading/isFetching/isError.
 * Заменяет собой блок children-компонента.
 * Может принимать один или несколько результатов вызова useQuery в виде объекта.
 * Проверка на undefined и состояния вычисляются общие для всех Query.
 */
export const RQWrapper = <T, U = T>(props: RQWrapperProps<T, U>) => {
  const {
    className,
    as,
    blockClassName,
    queries,
    isUseCurrentData = false,
    children,
    loader,
    error,
  } = props;

  const { queriesData, isLoading, isFetching, isError } = useQueriesStages<
    T,
    U
  >(queries, isUseCurrentData);

  const isSuccess = !isError && (isUseCurrentData ? !isFetching : !isLoading);

  if (isSuccess) {
    const isNonNullableData = isNonNullableQueriesData<T, U>(queriesData);

    if (isNonNullableData) {
      return (
        <RQChildrenWrapper
          as={as}
          className={blockClassName}
          isFetching={isFetching}
          loader={loader}
        >
          {children(queriesData)}
        </RQChildrenWrapper>
      );
    }
  }

  return (
    <div className={blockClassName}>
      <div className={clsx(styles.wrapper, className)}>
        {getNoQueryData(
          isUseCurrentData ? isFetching : isLoading,
          isError,
          loader,
          error
        )}
      </div>
    </div>
  );
};

function getNoQueryData(
  isLoading: boolean,
  isError: boolean,
  loader: ReactNode,
  error: ReactNode
) {
  if (isLoading) {
    return loader;
  }

  if (isError) {
    return error;
  }

  return null;
}
