import { Button, DatePicker, Form, Input, Select } from "antd";

import { useEffect } from "react";

interface Props {
  labelCol: number;
  wrapperCol: number;
  onFinish: (value: UserForm) => void;
  btnText?: string;
  intitalData: UserForm;
}

export default function UserForm({
  labelCol,
  wrapperCol,
  onFinish,
  btnText = "create",
  intitalData,
}: Props) {
  const datalist = [
    { name: "Software Engineer", key: "sf" },
    { name: "Programmer", key: "pm" },
    { name: "Developer", key: "de" },
  ];
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue(intitalData);
  }, [form, intitalData]);
  return (
    <Form
      form={form}
      initialValues={intitalData}
      labelCol={{ span: labelCol }}
      wrapperCol={{ span: wrapperCol }}
      layout="horizontal"
      onFinish={onFinish}
    >
      <Form.Item
        label="User Name"
        name="name"
        rules={[{ required: true, message: "Please input your Username!" }]}
      >
        <Input placeholder="Username" />
      </Form.Item>
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: "Please input your Email!" }]}
      >
        <Input placeholder="Email" />
      </Form.Item>
      <Form.Item label="DatePicker" name="date">
        <DatePicker />
      </Form.Item>
      <Form.Item
        name="role"
        label="Select"
        rules={[{ required: true, message: "Please Select ..." }]}
      >
        <Select placeholder="Please Select ...">
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
      </Form.Item>
      <Form.Item wrapperCol={{ offset: labelCol }}>
        <Button htmlType="submit" className="btn-green">
          {btnText}
        </Button>
      </Form.Item>
    </Form>
  );
}
