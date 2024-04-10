import type { IconProps } from "../../../interface/commonInterface";

export default function ArrowBackIcon({
  width,
  height,
  size,
  color = "#062360",
  ...rest
}: IconProps) {
  return (
    <svg
      {...rest}
      width={width ?? size ?? 17}
      height={height ?? size ?? 31}
      viewBox="0 0 17 31"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.2143 29.5667C17.2524 28.5287 17.2533 26.8459 16.2164 25.8067L8.69917 18.2731C7.14119 16.7117 7.14119 14.1838 8.69917 12.6224L16.2164 5.08878C17.2533 4.04958 17.2524 2.36684 16.2143 1.32878C15.1755 0.289917 13.4912 0.289918 12.4523 1.32878L1.16175 12.6193C-0.400351 14.1814 -0.400348 16.7141 1.16175 18.2762L12.4523 29.5667C13.4912 30.6056 15.1755 30.6056 16.2143 29.5667Z"
        fill={color}
      />
    </svg>
  );
}
