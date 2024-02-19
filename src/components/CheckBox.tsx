import { Checkbox } from "antd";

interface Props {
  name: string;
  text: string;
  checked?: string;
}

export default function CheckBox({ text }: Props) {
  return <Checkbox>{text}</Checkbox>;
}
