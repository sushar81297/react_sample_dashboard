import { FormEvent, ReactNode } from "react";

import { Button } from "antd";

interface Props {
  colOffset?: number;
  formCss?: string;
  styleClass?: string;
  text: ReactNode;
  btnType?: "submit" | "button";
  handleBtn?: (e: FormEvent) => void;
}

const ButtonBox: React.FC<Props> = ({
  btnType = "submit",
  styleClass,
  text,
  handleBtn,
}: Props) => {
  return (
    <Button
      htmlType={btnType}
      className={styleClass}
      onClick={(e) => handleBtn && handleBtn(e)}
    >
      {text}
    </Button>
  );
};

ButtonBox.defaultProps = {
  colOffset: 0,
  formCss: "",
  btnType: "submit",
  styleClass: "",
};

export default ButtonBox;
