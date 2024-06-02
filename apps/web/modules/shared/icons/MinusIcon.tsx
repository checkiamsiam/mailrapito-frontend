import type { IconProps } from "../../../interface/commonInterface";


export default function MinusIcon({
  width,
  height,
  size,
  color = "white",
  ...rest
}: IconProps) {
  return (
    <svg
      {...rest}
      width={width ?? size ?? 15}
      height={height ?? size ?? 2}
      viewBox="0 0 15 2"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M1.66675 1H13.3334" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  );
}
