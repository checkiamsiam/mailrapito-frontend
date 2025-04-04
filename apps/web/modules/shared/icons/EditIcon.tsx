import type { IconProps } from "../../../interface/commonInterface";

export default function EditIcon({
  width,
  height,
  size,
  color = "black",
  ...rest
}: IconProps) {
  return (
    <svg
      {...rest}
      width={width ?? size ?? 18}
      height={height ?? size ?? 21}
      viewBox="0 0 18 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.41421 14.39L13.5563 4.24785L12.1421 2.83363L2 12.9758V14.39H3.41421ZM4.24264 16.39H0V12.1473L11.435 0.712308C11.8256 0.321788 12.4587 0.321788 12.8492 0.712308L15.6777 3.54074C16.0682 3.93126 16.0682 4.56443 15.6777 4.95495L4.24264 16.39ZM0 18.39H18V20.39H0V18.39Z"
        fill={color}
      />
    </svg>
  );
}
