import type { IconProps } from "../../../interface/commonInterface";

export default function CheckBoxCheckedIcon({
  width = 24,
  height = 24,
  size,
  color = "#323FD4",
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
      <rect y="0.5" width="24" height="24" rx="6" fill={color} />
      <g clipPath="url(#clip0_32_2797)">
        <path
          d="M10.3334 15.1433L17.9934 7.4825L19.1725 8.66083L10.3334 17.5L5.03003 12.1967L6.20836 11.0183L10.3334 15.1433Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_32_2797">
          <rect
            width="20"
            height="20"
            fill="white"
            transform="translate(2 2.5)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}
