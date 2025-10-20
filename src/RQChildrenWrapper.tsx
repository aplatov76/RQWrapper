import React, {
  type ComponentProps,
  type ElementType,
  type ReactNode,
} from "react";
import clsx from "clsx";

import styles from "./RQWrapper.module.css";

interface RtkChildrenWrapperProps<T extends ElementType> {
  className?: string;
  as?: T;
  isFetching: boolean;
  children: ReactNode;
  loader: ReactNode;
}

export const RQChildrenWrapper = <T extends ElementType = "div">(
  props: RtkChildrenWrapperProps<T> & ComponentProps<T>
) => {
  const { className, as, isFetching, children, loader, ...restProps } = props;

  const Component = as || "div";

  return (
    <Component {...restProps} className={clsx(styles.children, className)}>
      {children}

      {isFetching && loader}
    </Component>
  );
};
