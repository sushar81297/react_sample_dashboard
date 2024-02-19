import { Select } from "antd";

interface DataProps {
  name: string;
  key: string;
}

interface Props {
  label?: string;
  name: string;
  type?: string;
  required?: boolean;
  datalist: DataProps[];
  requiredMessage?: string;
  placeholder?: string;
}

export default function SelectBox({ datalist, placeholder }: Props) {
  return (
    <Select placeholder={placeholder}>
      {datalist.map((data, idx) => {
        return (
          data.name && (
            <Select.Option key={idx} value={data.name}>
              {data.name}
            </Select.Option>
          )
        );
      })}
    </Select>
  );
}
