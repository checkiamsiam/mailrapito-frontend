import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@ui/components/form";
import type { TextareaProps } from "@ui/components/textarea";
import { Textarea } from "@ui/components/textarea";
import { useFormContext } from "react-hook-form";

interface MessageFieldProps extends TextareaProps {
  label: string;
  name: string;
}

const MessageField = ({
  label,
  name,
  placeholder,
  ...rest
}: MessageFieldProps) => {
  const form = useFormContext();
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <FormItem className="space-y-1">
          <FormLabel className="text-sm">{label}</FormLabel>
          <FormControl>
            <Textarea
              placeholder={placeholder ?? label}
              className={`rounded-sm border-[#D0D5DD] bg-white placeholder:text-[#8F8F8F] ${error ? "border-red-500 focus:!border-red-500" : ""}`}
              style={{ boxShadow: "0px 1px 2px 0px #1018280D" }}
              {...field}
              {...rest}
            />
          </FormControl>

          <FormMessage className="text-xs" />
        </FormItem>
      )}
    />
  );
};

export default MessageField;
