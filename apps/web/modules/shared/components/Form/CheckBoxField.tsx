/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import type { CheckboxProps } from "@radix-ui/react-checkbox";
import { Checkbox } from "@ui/components/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@ui/components/form";
import { useFormContext } from "react-hook-form";

interface CheckBoxFieldProps extends CheckboxProps {
  label: string;
  name: string;
}

const CheckBoxField = ({ label, name, ...rest }: CheckBoxFieldProps) => {
  const form = useFormContext();
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-row flex items-center space-x-2 space-y-0">
          <FormControl>
            <Checkbox
              checked={field?.value}
              onCheckedChange={field.onChange}
              style={{ boxShadow: "0px 1px 2px 0px #1018280D" }}
              {...field}
              {...rest}
            />
          </FormControl>
          <FormLabel className="cursor-pointer text-sm">{label}</FormLabel>
        </FormItem>
      )}
    />
  );
};

export default CheckBoxField;
