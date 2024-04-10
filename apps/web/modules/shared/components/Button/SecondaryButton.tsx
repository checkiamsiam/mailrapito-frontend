/* eslint-disable react/display-name */
import type { ButtonProps } from "@ui/components/button";
import { Button } from "@ui/components/button";
import { cn } from "@ui/lib";
import React from "react";

const SecondaryButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, ...rest }, ref) => {
    return (
      <Button
        {...rest}
        variant="outline"
        ref={ref}
        className={cn(
          `border-primary hover:text-primary flex items-center justify-center gap-2 p-5 duration-300 hover:shadow-md`,
          className,
        )}
      >
        {children}
      </Button>
    );
  },
);

export default SecondaryButton;
