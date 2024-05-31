// Tremor Raw Card [v0.0.0]

import React from "react";
import { Slot } from "@radix-ui/react-slot";

import { cx } from "../../lib/utils";

interface CardProps extends React.ComponentPropsWithoutRef<"div"> {
  asChild?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, asChild, ...props }, forwardedRef) => {
    const Component = asChild ? Slot : "div";
    return (
      <Component
        ref={forwardedRef}
        className={cx(
          // base
          "relative w-full rounded-md border p-6 text-left shadow-sm",
          // background color
          " bg-white dark:bg-[#090E1A]",
          // border color
          "border-gray-200 dark:border-gray-800",
          className
        )}
        {...props}
      />
    );
  }
);

Card.displayName = "Card";

export { Card, type CardProps };
