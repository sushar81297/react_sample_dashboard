import { Column } from "@ant-design/plots";

export default function ColumnChart() {
  const data = [
    { date: "2024/02/15", value: 100 },
    { date: "2024/02/16", value: 220 },
    { date: "2024/02/17", value: 150 },
    { date: "2024/02/18", value: 180 },
    { date: "2024/02/19", value: 200 },
    { date: "2024/02/20", value: 130 },
    { date: "2024/02/21", value: 120 },
  ];

  const config = {
    data: data,
    xField: "date",
    yField: "value",
    label: {
      position: "middle",
      style: {
        fill: "#FFFFFF",
        opacity: 0.6,
      },
    },
  };

  return <Column {...config} />;
}
