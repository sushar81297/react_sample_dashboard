import {
  Button,
  DatePicker,
  Flex,
  Form,
  Input,
  Modal,
  Pagination,
  Space,
  Table,
} from "antd";
import { CloseOutlined, SearchOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import Report from "@composable/report";
import { RootState } from "@store";
import type { TableProps } from "antd";
import { dateFormat } from "@utils/constant.ts";
import dayjs from "dayjs";
import { getOrderById } from "@api/report";
import { setLoading } from "@store/commonSlice";

export default function App() {
  const dispatch = useDispatch();
  const { orderData } = useSelector((state: RootState) => state.report);
  const { loading } = useSelector((state: RootState) => state.common);
  const { fetchData, onFinish, onChangePagination, onShowSizeChange } =
    Report();

  const [visible, setVisible] = useState(false);
  const [order, setOrder] = useState([] as OrderDetail[]);
  const [totalAmt, setTotalAmt] = useState(0);
  const [showForm, setShowForm] = useState(true);

  const columns: TableProps<OrderData>["columns"] = [
    {
      title: "No.",
      dataIndex: "key",
      key: "key",
      align: "center",
    },
    {
      title: "Seller Merchant",
      dataIndex: "seller_merchant",
      key: "seller_merchant",
    },
    {
      title: "Buyer Merchant",
      dataIndex: "buyer_merchant",
      key: "buyer_merchant",
    },
    {
      title: "Buyer Phone Number",
      dataIndex: "buyer_phone",
      key: "buyer_phone",
    },

    {
      title: "Net Amount",
      dataIndex: "net_amount",
      key: "net_amount",
    },

    {
      title: "Order Date",
      dataIndex: "order_date",
      key: "order_date",
      render: (order_date) => (
        <span>{dayjs(order_date).format(dateFormat)}</span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (record: OrderData) => (
        <Space size="middle">
          <Button onClick={() => detailFunc(record.id)} className="btn-green">
            Order Detail
          </Button>
        </Space>
      ),
    },
  ];

  const detailFunc = async (id: string) => {
    dispatch(setLoading(true));
    const detailData = await getOrderById(id);
    let total = 0;
    detailData?.order_details.map((order: OrderDetail) => {
      total += order.total_amount;
    });
    setOrder(detailData.order_details);
    setTotalAmt(total);
    dispatch(setLoading(false));
    setVisible(true);
  };

  useEffect(() => {
    dispatch(setLoading(true));
    fetchData({ pageNumber: 0, pageSize: 10 });
  }, []);

  const onCloseFunc = () => {
    setVisible(false);
  };

  const toggleSearch = () => {
    setShowForm(!showForm);
  };

  return (
    <>
      <div className="report-form">
        <Form
          className={`form report ${showForm ? "show" : "hide"}`}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Flex align="center" justify="center" gap={15}>
            {/* <Form.Item name="buyerCode" label="Buyer Code">
            <Input placeholder="Buyer Code" />
          </Form.Item> */}
            <Form.Item name="buyerName" label="Buyer Name">
              <Input placeholder="Buyer Name" />
            </Form.Item>
            <Form.Item name="buyerPhone" label="Buyer Phone">
              <Input placeholder="Buyer Phone Number" />
            </Form.Item>
            {/* </Flex>
        <Flex align="center" justify="center" gap={15}> */}
            {/* <Form.Item name="sellerCode" label="Seller Code">
            <Input placeholder="Seller Code" />
          </Form.Item> */}
            <Form.Item name="sellerName" label="Seller Name">
              <Input placeholder="Seller Name" />
            </Form.Item>
            <Form.Item name="sellerPhone" label="Seller Phone">
              <Input placeholder="Seller Phone Number" />
            </Form.Item>
          </Flex>
          <Flex align="center" justify="center" gap={15}>
            <Form.Item name="minAmount" label="Minimum Net Amount">
              <Input placeholder="Minimum Net Amount" type="number" />
            </Form.Item>
            <Form.Item name="maxAmount" label="Maximum Net Amount">
              <Input placeholder="Maximum Net Amount" type="number" />
            </Form.Item>
            <Form.Item name="fromDate" label="Order Date">
              <DatePicker placeholder="From Order Date" />
            </Form.Item>
            <Form.Item name="toDate" label="Order Date">
              <DatePicker placeholder="To Order Date" />
            </Form.Item>
            <Form.Item>
              <Button className="btn-green" htmlType="submit">
                <SearchOutlined />
              </Button>
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit" onClick={toggleSearch}>
                <CloseOutlined />
              </Button>
            </Form.Item>
          </Flex>
        </Form>
        <Button
          className={`btn-green ${showForm ? "hide" : "show"}`}
          htmlType="submit"
          onClick={toggleSearch}
        >
          <SearchOutlined />
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={orderData?.data ? orderData?.data : []}
        loading={loading}
        pagination={false}
        scroll={{ y: 300 }}
      />
      <Pagination
        className="pagination"
        showSizeChanger
        onShowSizeChange={onShowSizeChange}
        defaultCurrent={orderData?.currentPage ? orderData?.currentPage + 1 : 1}
        defaultPageSize={orderData?.pageSize}
        total={orderData?.totalElements}
        showTotal={(total, range) =>
          `${range[0]}-${range[1]} of ${total} items`
        }
        responsive={true}
        onChange={onChangePagination}
      />
      <Modal
        title="Order Detail"
        open={visible}
        onCancel={() => onCloseFunc()}
        footer={null}
      >
        <h3>Order Items:</h3>
        <div className="order-list">
          <ol>
            {order &&
              order.map((itemData: OrderDetail, index: number) => (
                <li key={index}>
                  <div>
                    <strong>{itemData?.item.display_name}</strong>
                    <strong className="order-price">
                      {itemData?.total_amount}MMK
                    </strong>
                  </div>
                  <div>
                    <strong>Quantity:</strong> {itemData.quantity}
                  </div>
                  <div>
                    <strong>Price:</strong> {itemData.amount}MMK
                  </div>
                </li>
              ))}
          </ol>
        </div>
        <h3 className="total-amt">
          Total Amount
          <strong className="order-price">{totalAmt}MMK</strong>
        </h3>

        <div className="order-btn-container">
          <Button onClick={onCloseFunc} className="btn-green order-btn">
            OK
          </Button>
        </div>
      </Modal>
    </>
  );
}
