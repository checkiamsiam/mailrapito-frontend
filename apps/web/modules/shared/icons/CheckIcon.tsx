import type { IconProps } from "../../../interface/commonInterface";

export default function CheckIcon({
  width,
  height,
  size,
  color = "#323FD4",
  ...rest
}: IconProps) {
  return (
    <svg
      {...rest}
      width={width ?? size ?? 16}
      height={height ?? size ?? 12}
      viewBox="0 0 16 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 7L5 11L15 1"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
