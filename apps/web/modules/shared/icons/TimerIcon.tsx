import type { IconProps } from "../../../interface/commonInterface";

export default function TimerIcon({
  width,
  height,
  size,
  color = "black",
  ...rest
}: IconProps) {
  return (
    <svg
      {...rest}
      width={width ?? size ?? 13}
      height={height ?? size ?? 16}
      viewBox="0 0 13 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.833374 0.5H12.1667V3.84496L7.58847 8L12.1667 12.1551V15.5H0.833374V12.1551L5.41162 8L0.833374 3.84496V0.5ZM9.54354 4.25L10.75 3.15505V2H2.25004V3.15505L3.45652 4.25H9.54354ZM6.50004 8.98783L2.25004 12.8449V14H2.95837L6.50004 11.75L10.0417 14H10.75V12.8449L6.50004 8.98783Z"
        fill={color}
      />
    </svg>
  );
}
