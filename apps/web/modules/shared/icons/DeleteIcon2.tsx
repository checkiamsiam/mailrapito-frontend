import type { IconProps } from "../../../interface/commonInterface";

export default function DeleteIcon2({
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
      <g clipPath="url(#clip0_88_458)">
        <path
          d="M17.4 6H22.4V8H20.4V21C20.4 21.2652 20.2947 21.5196 20.1071 21.7071C19.9196 21.8946 19.6652 22 19.4 22H5.40002C5.13481 22 4.88045 21.8946 4.69292 21.7071C4.50538 21.5196 4.40002 21.2652 4.40002 21V8H2.40002V6H7.40002V3C7.40002 2.73478 7.50538 2.48043 7.69292 2.29289C7.88045 2.10536 8.13481 2 8.40002 2H16.4C16.6652 2 16.9196 2.10536 17.1071 2.29289C17.2947 2.48043 17.4 2.73478 17.4 3V6ZM18.4 8H6.40002V20H18.4V8ZM9.40002 4V6H15.4V4H9.40002Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_88_458">
          <rect
            width={width ?? size}
            height={height ?? size}
            fill={color}
            transform="translate(0.400024)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}
