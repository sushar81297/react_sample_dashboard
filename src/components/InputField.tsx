import { Input } from "antd";

interface Props {
  Icon?: any;
  label?: string;
  name: string;
  type?: string;
  required?: boolean;
  requiredMessage?: string;
  placeholder?: string;
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputField({
  Icon,
  type = "text",
  placeholder,
  handleInput,
}: Props) {
  return (
    <Input
      prefix={Icon && <Icon className="site-form-item-icon" />}
      type={type}
      placeholder={placeholder}
      onChange={(e) => handleInput(e)}
    />
  );
}
