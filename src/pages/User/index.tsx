import { Button, Modal, Space, Table, Tag } from "antd";
import { useEffect, useState } from "react";

import type { TableProps } from "antd";
import UserForm from "@components/UserForm";
import dataObj from "@api/setupData.json";
import { dateFormat } from "@utils/constant.ts";
import dayjs from "dayjs";

interface DataType {
  remember: boolean;
  date: dayjs.Dayjs;
  key: string;
  name: string;
  role: string;
  email: string;
}

export default function App() {
  const [visible, setVisible] = useState(false);
  const [updateData, setUpdateData] = useState({} as UserForm);
  const [data, setData] = useState<DataType[]>([]);

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date) => <span>{dayjs(date).format(dateFormat)}</span>,
    },
    {
      title: "Role",
      key: "role",
      dataIndex: "role",
      render: (role) => (
        <>
          <Tag color="geekblue" key={role}>
            {role.toUpperCase()}
          </Tag>
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (record: DataType) => (
        <Space size="middle">
          <Button onClick={() => onEditFun(record.key)}>Edit</Button>
          <Button danger onClick={() => confirm(record.key)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const onEditFun = (key: string) => {
    const editValue = data.find((item) => item.key === key);
    if (editValue) {
      setUpdateData({ ...editValue, date: dayjs(editValue.date, dateFormat) });
      setVisible(true);
    }
  };

  useEffect(() => {
    const newData = dataObj.data.map((item) => ({
      ...item,
      remember: true,
      date: dayjs(item.date, dateFormat),
    }));
    setData(newData);
  }, []);

  const confirm = (key: string) => {
    Modal.confirm({
      title: "Delete Confirmation",
      content: "Are you sure want to delete!!",
      okText: "Yes",
      cancelText: "Cancel",
      okButtonProps: {
        danger: true,
      },
      cancelButtonProps: {
        danger: true,
      },
      onOk: () => {
        const updatedData = data.filter((item) => item.key !== key);
        setData(updatedData);
      },
    });
  };

  const onFinish = (value: UserForm) => {
    const copyData = [...data];
    const findIndex = copyData.findIndex((item) => item.key === updateData.key);
    if (findIndex > -1) {
      copyData[findIndex] = value;
      copyData[findIndex].key = updateData.key;
    }
    setData(copyData);
    onCloseFunc();
  };

  const onCloseFunc = () => {
    setUpdateData({} as DataType);
    setVisible(false);
  };

  return (
    <>
      <Table columns={columns} dataSource={data} />
      <Modal
        title="Edit User"
        open={visible}
        onCancel={() => onCloseFunc()}
        footer={null}
      >
        <UserForm
          labelCol={6}
          wrapperCol={18}
          onFinish={onFinish}
          btnText="Edit"
          intitalData={updateData}
        />
      </Modal>
    </>
  );
}
