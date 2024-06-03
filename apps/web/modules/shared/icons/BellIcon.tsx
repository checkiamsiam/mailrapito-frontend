import type { IconProps } from "../../../interface/commonInterface";

export default function BellIcon({
  width = 20,
  height = 20,
  size,
  color = "#868E96",
  ...rest
}: IconProps) {
  return (
    <svg
      {...rest}
      width={width ?? size}
      height={height ?? size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18.3333 16.6667H1.66663V15H2.49996V9.19251C2.49996 5.03584 5.85829 1.66667 9.99996 1.66667C14.1416 1.66667 17.5 5.03584 17.5 9.19251V15H18.3333V16.6667ZM4.16663 15H15.8333V9.19251C15.8333 5.95667 13.2216 3.33334 9.99996 3.33334C6.77829 3.33334 4.16663 5.95667 4.16663 9.19251V15ZM7.91663 17.5H12.0833C12.0833 18.0525 11.8638 18.5824 11.4731 18.9731C11.0824 19.3638 10.5525 19.5833 9.99996 19.5833C9.44743 19.5833 8.91752 19.3638 8.52682 18.9731C8.13612 18.5824 7.91663 18.0525 7.91663 17.5Z"
        fill={color}
      />
    </svg>
  );
}
