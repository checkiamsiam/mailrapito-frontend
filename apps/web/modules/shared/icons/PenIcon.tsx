import type { IconProps } from "../../../interface/commonInterface";

export default function PenIcon({
  width,
  height,
  size,
  color = "#323FD4",
  ...rest
}: IconProps) {
  return (
    <svg
      {...rest}
      width={width ?? size ?? 19}
      height={height ?? size ?? 19}
      viewBox="0 0 19 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 17H3.4L12.025 8.375L10.625 6.975L2 15.6V17ZM16.3 6.925L12.05 2.725L13.45 1.325C13.8333 0.941667 14.3043 0.75 14.863 0.75C15.421 0.75 15.8917 0.941667 16.275 1.325L17.675 2.725C18.0583 3.10833 18.2583 3.571 18.275 4.113C18.2917 4.65433 18.1083 5.11667 17.725 5.5L16.3 6.925ZM1 19C0.716667 19 0.479333 18.904 0.288 18.712C0.0960001 18.5207 0 18.2833 0 18V15.175C0 15.0417 0.025 14.9127 0.075 14.788C0.125 14.6627 0.2 14.55 0.3 14.45L10.6 4.15L14.85 8.4L4.55 18.7C4.45 18.8 4.33767 18.875 4.213 18.925C4.08767 18.975 3.95833 19 3.825 19H1Z"
        fill={color}
      />
    </svg>
  );
}
