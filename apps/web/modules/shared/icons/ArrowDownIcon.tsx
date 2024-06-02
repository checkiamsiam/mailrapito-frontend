import type { IconProps } from "../../../interface/commonInterface";

export default function ArrowDownIcon({
  width = 24,
  height = 24,
  size,
  color = "#495057",
  ...rest
}: IconProps) {
  return (
    <svg
      {...rest}
      width={width ?? size}
      height={height ?? size}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_171_574)">
        <path
          d="M12 13.172L16.95 8.22198L18.364 9.63598L12 16L5.63599 9.63598L7.04999 8.22198L12 13.172Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_171_574">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
