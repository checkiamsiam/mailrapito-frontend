
import type { IconProps } from "../../../interface/commonInterface";

export default function LogoutIcon({
  width,
  height,
  size,
  color = "#09121F",
  ...rest
}: IconProps) {
  return (
    <svg
      {...rest}
      width={width ?? size ?? 28}
      height={height ?? size ?? 28}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12.7273 28C5.69819 28 0 21.7319 0 14C0 6.26801 5.69819 0 12.7273 0C16.8907 0 20.5873 2.19909 22.9093 5.59892L19.4611 5.59903C17.6663 3.85699 15.309 2.8 12.7273 2.8C7.10401 2.8 2.54545 7.81441 2.54545 14C2.54545 20.1856 7.10401 25.2 12.7273 25.2C15.3096 25.2 17.6675 24.1424 19.4624 22.3997H22.9102C20.5883 25.8003 16.8913 28 12.7273 28ZM21.6364 19.6V15.4H11.4545V12.6H21.6364V8.4L28 14L21.6364 19.6Z" fill={color}/>
    </svg>
  );
}