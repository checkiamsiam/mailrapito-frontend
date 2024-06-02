import type { IconProps } from "../../../interface/commonInterface";

export default function RefreshIcon2({
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
      <g clipPath="url(#clip0_88_647)">
        <path
          d="M18.6371 19.567C16.8225 21.1393 14.5011 22.0033 12.1001 22C6.5771 22 2.1001 17.523 2.1001 12C2.1001 6.477 6.5771 2 12.1001 2C17.6231 2 22.1001 6.477 22.1001 12C22.1001 14.136 21.4301 16.116 20.2901 17.74L17.1001 12H20.1001C20.0999 10.1562 19.4629 8.36906 18.2968 6.94089C17.1306 5.51272 15.507 4.53119 13.7004 4.16236C11.8939 3.79352 10.0154 4.06002 8.38278 4.91677C6.75012 5.77351 5.46352 7.16791 4.74062 8.86408C4.01772 10.5603 3.9029 12.4541 4.41559 14.2251C4.92827 15.9962 6.03699 17.5358 7.55418 18.5836C9.07137 19.6313 10.9039 20.1228 12.7417 19.9749C14.5796 19.827 16.31 19.0488 17.6401 17.772L18.6371 19.567Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_88_647">
          <rect
            width={width ?? size}
            height={height ?? size}
            fill={color}
            transform="translate(0.100098)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}
