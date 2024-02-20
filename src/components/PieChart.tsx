import { Pie } from "@ant-design/plots";

export default function PieChart() {
  const data = [
    { type: "red", value: 100 },
    { type: "yellow", value: 220 },
    { type: "green", value: 150 },
    { type: "white", value: 180 },
    { type: "blue", value: 200 },
    { type: "pink", value: 130 },
    { type: "gray", value: 120 },
  ];
  const config = {
    data: data,
    angleField: "value",
    colorField: "type",
    radius: 0.8,
    label: {
      type: "spider",
      content: "{name}\n{percentage}",
    },
    interactions: [{ type: "element-selected" }, { type: "element-active" }],
  };
  return <Pie {...config} />;
}
