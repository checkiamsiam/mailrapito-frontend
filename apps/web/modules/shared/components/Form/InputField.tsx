import { Button } from "@ui/components/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@ui/components/form";
import { Icon } from "@ui/components/icon";
import type { InputProps } from "@ui/components/input";
import { Input } from "@ui/components/input";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

interface InputFieldProps extends InputProps {
  label: string;
  name: string;
}

const InputField = ({
  label,
  type = "text",
  name,
  placeholder,
  ...rest
}: InputFieldProps) => {
  const form = useFormContext();
  const [tempType, setTempType] = useState(type);
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <FormItem className="relative space-y-1">
          <FormLabel className="text-sm">{label}</FormLabel>
          <FormControl>
            <Input
              type={tempType}
              placeholder={placeholder ?? label}
              className={`rounded-sm border-[#D0D5DD] bg-white py-5 placeholder:text-[#8F8F8F] ${error ? "border-red-500 focus:!border-red-500" : ""}`}
              style={{ boxShadow: "0px 1px 2px 0px #1018280D" }}
              {...field}
              {...rest}
            />
          </FormControl>
          {type === "password" && (
            <div className="absolute right-0 top-7">
              <Button
                size="icon"
                variant="ghost"
                className="rounded-full"
                type="button"
                onClick={() =>
                  setTempType((prev) =>
                    prev === "password" ? "text" : "password",
                  )
                }
              >
                {tempType === "text" ? (
                  <Icon.show className="text-gray-500" size={16} />
                ) : (
                  <Icon.hide className="text-gray-500" size={16} />
                )}
              </Button>
            </div>
          )}

          <FormMessage className="text-xs" />
        </FormItem>
      )}
    />
  );
};

export default InputField;
