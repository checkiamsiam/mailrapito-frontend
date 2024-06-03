import type { IconProps } from "../../../interface/commonInterface";

export default function CloseIcon({
  width,
  height,
  size,
  color = "#495057",
  ...rest
}: IconProps) {
  return (
    <svg
      {...rest}
      width={width ?? size ?? 16}
      height={height ?? size ?? 16}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.00008 6.3032L13.9401 0.363201L15.6369 2.06L9.69688 8L15.6369 13.94L13.9401 15.6368L8.00008 9.6968L2.06008 15.6368L0.363281 13.94L6.30328 8L0.363281 2.06L2.06008 0.363201L8.00008 6.3032Z"
        fill={color}
      />
    </svg>
  );
}
