import type { IconProps } from "../../../interface/commonInterface";

export default function HistoryIcon({
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
      <g clipPath="url(#clip0_100_1428)">
        <path
          d="M12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22C6.477 22 2 17.523 2 12H4C4 16.418 7.582 20 12 20C16.418 20 20 16.418 20 12C20 7.582 16.418 4 12 4C9.25 4 6.824 5.387 5.385 7.5H8V9.5H2V3.5H4V6C5.824 3.57 8.729 2 12 2ZM13 7V11.585L16.243 14.828L14.828 16.243L11 12.413V7H13Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_100_1428">
          <rect width="24" height="24" fill={color} />
        </clipPath>
      </defs>
    </svg>
  );
}
