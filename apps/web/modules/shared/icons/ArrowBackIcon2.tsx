import type { IconProps } from "../../../interface/commonInterface";

export default function ArrowBackIcon2({
  width,
  height,
  size,
  color = "#56565B",
  ...rest
}: IconProps) {
  return (
    <svg
      {...rest}
      width={width ?? size ?? 16}
      height={height ?? size ?? 16}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.828 7H16V9H3.828L9.192 14.364L7.778 15.778L0 8L7.778 0.222L9.192 1.636L3.828 7Z"
        fill={color}
      />
    </svg>
  );
}
