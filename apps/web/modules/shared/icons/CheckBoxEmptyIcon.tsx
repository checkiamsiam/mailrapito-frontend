import type { IconProps } from "../../../interface/commonInterface";

export default function CheckBoxEmptyIcon({
  width = 24,
  height = 24,
  size,
  color = "#ADB5BD",
  ...rest
}: IconProps) {
  return (
    <svg
      {...rest}
      width={width ?? size}
      height={height ?? size}
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="0.5" y="1" width="23" height="23" rx="5.5" fill="#F8F9FA" />
      <rect x="0.5" y="1" width="23" height="23" rx="5.5" stroke={color} />
    </svg>
  );
}
