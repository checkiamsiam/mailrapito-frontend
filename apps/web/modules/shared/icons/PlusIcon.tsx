import type { IconProps } from "../../../interface/commonInterface";

export default function PlusIcon({
  width = 24,
  height = 24,
  size,
  color,
  ...rest
}: IconProps) {
  return (
    <svg
      {...rest}
      width={width ?? size}
      height={height ?? size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11 11.5H11.5V11V7.5H12.5V11V11.5H13H16.5V12.5H13H12.5V13V16.5H11.5V13V12.5H11H7.5V11.5H11ZM12 21.5C6.75314 21.5 2.5 17.2469 2.5 12C2.5 6.75314 6.75314 2.5 12 2.5C17.2469 2.5 21.5 6.75314 21.5 12C21.5 17.2469 17.2469 21.5 12 21.5ZM12 20.5C14.2543 20.5 16.4163 19.6045 18.0104 18.0104C19.6045 16.4163 20.5 14.2543 20.5 12C20.5 9.74566 19.6045 7.58365 18.0104 5.98959C16.4163 4.39553 14.2543 3.5 12 3.5C9.74566 3.5 7.58365 4.39553 5.98959 5.98959C4.39553 7.58365 3.5 9.74566 3.5 12C3.5 14.2543 4.39553 16.4163 5.98959 18.0104C7.58365 19.6045 9.74566 20.5 12 20.5Z"
        fill={color}
        stroke={color}
      />
    </svg>
  );
}
