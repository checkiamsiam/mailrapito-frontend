import type { IconProps } from "../../../interface/commonInterface";

export default function QuestionCircleIcon({
  width,
  height,
  size,
  color = "white",
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
        d="M6.05992 6C6.21665 5.55444 6.52602 5.17874 6.93322 4.93942C7.34042 4.70011 7.81918 4.61263 8.2847 4.69247C8.75022 4.77232 9.17246 5.01435 9.47664 5.37569C9.78081 5.73702 9.94729 6.19435 9.94659 6.66667C9.94659 8 7.94659 8.66667 7.94659 8.66667M7.99992 11.3333H8.00659M14.6666 8C14.6666 11.6819 11.6818 14.6667 7.99992 14.6667C4.31802 14.6667 1.33325 11.6819 1.33325 8C1.33325 4.3181 4.31802 1.33333 7.99992 1.33333C11.6818 1.33333 14.6666 4.3181 14.6666 8Z" stroke={color} strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  );
}