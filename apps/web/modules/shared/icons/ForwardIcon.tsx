import type { IconProps } from "../../../interface/commonInterface";

export default function ForwardIcon({
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
      <path d="M13.7 14H11.7C10.0596 13.9994 8.45018 14.4471 7.04583 15.2949C5.64147 16.1427 4.49555 17.3582 3.73195 18.81C3.71049 18.5405 3.69981 18.2703 3.69995 18C3.69995 12.477 8.17695 8 13.7 8V2.5L24.2 11L13.7 19.5V14ZM11.7 12H15.7V15.308L21.021 11L15.7 6.692V10H13.7C12.5502 9.99871 11.4137 10.2458 10.3683 10.7244C9.32294 11.203 8.39327 11.9018 7.64295 12.773C8.93427 12.2612 10.3109 11.9989 11.7 12Z" fill={color}/>
    </svg>
  );
}
