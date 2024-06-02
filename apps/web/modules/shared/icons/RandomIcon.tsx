import type { IconProps } from "../../../interface/commonInterface";

export default function RandomIcon({
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
      <g clipPath="url(#clip0_88_492)">
        <path
          d="M3.30005 3H11.3V11H3.30005V3ZM3.30005 13H11.3V21H3.30005V13ZM13.3 3H21.3V11H13.3V3ZM13.3 13H21.3V21H13.3V13ZM15.3 5V9H19.3V5H15.3ZM15.3 15V19H19.3V15H15.3ZM5.30005 5V9H9.30005V5H5.30005ZM5.30005 15V19H9.30005V15H5.30005Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_88_492">
          <rect
            width="24"
            height="24"
            fill={color}
            transform="translate(0.300049)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}
