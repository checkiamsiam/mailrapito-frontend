import type { IconProps } from "../../../interface/commonInterface";

export default function MarkCircleIcon({
  width,
  height,
  size,
  color = "white",
  ...rest
}: IconProps) {
  return (
    <svg
      {...rest}
      width={width ?? size ?? 25}
      height={height ?? size ?? 24}
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_1_832)">
        <path
          d="M8 12L11 15L17 9M22.5 12C22.5 17.5228 18.0228 22 12.5 22C6.97715 22 2.5 17.5228 2.5 12C2.5 6.47715 6.97715 2 12.5 2C18.0228 2 22.5 6.47715 22.5 12Z"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_1_832">
          <rect x="0.5" width="24" height="24" rx="12" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
