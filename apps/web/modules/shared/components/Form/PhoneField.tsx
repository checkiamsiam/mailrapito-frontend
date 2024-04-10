/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@ui/components/form";
import type { InputProps } from "@ui/components/input";
import { useFormContext } from "react-hook-form";
import PhoneInput from "react-phone-input-2";

interface PhoneFieldProps extends InputProps {
  label: string;
  name: string;
}

const PhoneField = ({ label, name, ...rest }: PhoneFieldProps) => {
  const form = useFormContext();
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <FormItem className="space-y-1">
          <FormLabel className="text-sm">{label}</FormLabel>
          <FormControl>
            <PhoneInput
              country={"us"}
              value={field.value}
              enableSearch
              onChange={field.onChange}
              inputStyle={{
                width: "100%",
                height: "42px",
                borderRadius: "7px",
                borderColor: error ? "red" : "#D0D5DD",
              }}
              buttonStyle={{
                borderColor: error ? "red" : "#D0D5DD",
                borderRadius: "7px 0 0 7px",
              }}
              {...rest}
            />
          </FormControl>

          <FormMessage className="text-xs" />
        </FormItem>
      )}
    />
  );
};

export default PhoneField;
