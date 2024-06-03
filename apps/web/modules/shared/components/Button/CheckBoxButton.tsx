import CheckBoxCheckedIcon from "@shared/icons/CheckBoxCheckedIcon";
import CheckBoxEmptyIcon from "@shared/icons/CheckBoxEmptyIcon";
import type { ReactNode } from "react";
import React from "react";

type IProps = {
  checked: boolean;
  onClick?: () => void;
  label?: ReactNode | string;
};
const CheckBoxButton: React.FC<IProps> = ({ checked, onClick, label }) => {
  const [state, setState] = React.useState(checked);
  return (
    <button
      className="flex items-center gap-3"
      onClick={() => {
        setState((prev) => !prev);
        onClick ? onClick() : null;
      }}
    >
      {state ? <CheckBoxCheckedIcon /> : <CheckBoxEmptyIcon />}
      {label ? <div>{label}</div> : null}
    </button>
  );
};

export default CheckBoxButton;
