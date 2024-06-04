import CheckBoxCheckedIcon from "@shared/icons/CheckBoxCheckedIcon";
import CheckBoxEmptyIcon from "@shared/icons/CheckBoxEmptyIcon";
import type { ReactNode } from "react";
import React, { useEffect } from "react";

type IProps = {
  checked: boolean;
  onClick?: () => void;
  label?: ReactNode | string;
};
const CheckBoxButton: React.FC<IProps> = ({ checked, label }) => {
  const [state, setState] = React.useState(checked);

  useEffect(() => {
    setState(checked);
  }, [checked]);
  return (
    <button className="flex items-center gap-3">
      {state ? <CheckBoxCheckedIcon /> : <CheckBoxEmptyIcon />}
      {label ? <div>{label}</div> : null}
    </button>
  );
};

export default CheckBoxButton;
