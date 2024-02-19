import { Avatar, Button, Col, Dropdown, Row } from "antd";
import { Link, useNavigate } from "react-router-dom";
import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";

import { Layout } from "antd";
import type { MenuProps } from "antd";

const { Header } = Layout;

interface Props {
  collapsed: boolean;
  themeColor: {
    primaryColor: string;
    secondaryColor: string;
    whiteColor: string;
  };
  setCollapsed: (arg0: boolean) => void;
}

export default function HeaderMenu({
  collapsed,
  themeColor,
  setCollapsed,
}: Props) {
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/login");
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      icon: <TeamOutlined />,
      label: <Link to="/profile">Profile</Link>,
    },
    {
      key: "2",
      icon: <LogoutOutlined />,
      label: <span onClick={handleLogout}>Logout</span>,
    },
  ];

  return (
    <Header
      style={{
        position: "fixed",
        top: 0,
        zIndex: 1,
        width: "100%",
        color: themeColor.primaryColor,
        background: themeColor.whiteColor,
      }}
    >
      <Row gutter={24}>
        <Col span={10}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              paddingTop: 0,
            }}
          />
        </Col>
        <Col span={10} style={{ textAlign: "right" }}>
          <Dropdown menu={{ items }} placement="bottomRight" arrow>
            <Avatar icon={<UserOutlined />} style={{ cursor: "pointer" }} />
          </Dropdown>
        </Col>
      </Row>
    </Header>
  );
}
