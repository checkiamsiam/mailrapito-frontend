import type { ButtonProps } from "@ui/components/button";
import { Button } from "@ui/components/button";
import { cn } from "@ui/lib";

const PrimaryButton = ({ children, className, ...rest }: ButtonProps) => {
  const bgClasses = `before:bg-primary-gradient before:absolute before:transition-all before:content-[''] before:w-full before:h-full before:z-0 after:bg-secondary-gradient after:absolute after:transition-all after:content-[''] after:w-full after:h-full after:z-0 after:opacity-0 before:duration-300 after:duration-300`;
  return (
    <Button
      {...rest}
      className={cn(
        `relative overflow-hidden text-white transition-transform duration-300 hover:shadow-md active:scale-95 ${bgClasses} hover:before:opacity-0 hover:after:opacity-100`,
        className,
      )}
    >
      <div className="z-10 flex items-center gap-2">{children}</div>
    </Button>
  );
};

export default PrimaryButton;
