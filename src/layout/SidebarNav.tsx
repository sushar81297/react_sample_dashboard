import {
  AppstoreAddOutlined,
  AppstoreOutlined,
  HomeOutlined,
  PicRightOutlined,
  SolutionOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { Link, useLocation } from "react-router-dom";

import logoImg from "@assets/images/logo.png";

const { Sider } = Layout;

interface Props {
  collapsed: boolean;
  themeColor: {
    primaryColor: string;
    secondaryColor: string;
    whiteColor: string;
  };
}

export default function Sidebar({ collapsed, themeColor }: Props) {
  let openkeys = useLocation().pathname;
  const pathname = useLocation().pathname;
  if (openkeys.split("/").length > 2) openkeys = `/${openkeys.split("/")[1]}`;
  openkeys = `${openkeys}tag`;

  const menuItems = [
    {
      key: "/demo",
      icon: <HomeOutlined style={{ fontSize: "20px" }} type="setting" />,
      label: <Link to="/demo">Demo Home</Link>,
    },
    {
      key: "/reporttag",
      icon: <SolutionOutlined style={{ fontSize: "20px" }} type="setting" />,
      label: "Manage Report",
      children: [
        {
          key: "/report",
          icon: <PicRightOutlined />,
          label: <Link to="/report">Report</Link>,
        },
      ],
    },
    // {
    //   key: "/usertag",
    //   icon: <UserAddOutlined style={{ fontSize: "20px" }} type="setting" />,
    //   label: "Manage User",
    //   children: [
    //     {
    //       key: "/user",
    //       icon: <UserAddOutlined />,
    //       label: <Link to="/user">Users</Link>,
    //     },
    //     {
    //       key: "/user/create",
    //       icon: <UserAddOutlined />,
    //       label: <Link to="/user/create">Create</Link>,
    //     },
    //   ],
    // },
    // {
    //   key: "/itemtag",
    //   icon: <AppstoreOutlined style={{ fontSize: "20px" }} type="setting" />,
    //   label: "Manage Item",
    //   children: [
    //     {
    //       key: "/item",
    //       icon: <AppstoreOutlined />,
    //       label: <Link to="/item">Items</Link>,
    //     },
    //     {
    //       key: "/item/create",
    //       icon: <AppstoreAddOutlined />,
    //       label: <Link to="/item/create">Create</Link>,
    //     },
    //   ],
    // },
  ];
  return (
    // <Sider breakpoint="lg" width={250} style={{ background: primaryColor}} collapsedWidth="0" collapsible collapsed={collapsed}>
    <Sider
      breakpoint="lg"
      width={250}
      collapsible
      collapsed={collapsed}
      style={{
        overflow: "auto",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
        background: themeColor.primaryColor,
      }}
    >
      <div className={`logo ${collapsed && "collapsed-logo"}`}>
        <h1>GMS</h1>
      </div>
      <Menu
        theme="light"
        defaultOpenKeys={[openkeys]}
        defaultSelectedKeys={[pathname]}
        mode="inline"
        style={{
          padding: "10px",
          background: themeColor.primaryColor,
          color: themeColor.whiteColor,
        }}
        items={menuItems}
      />
    </Sider>
  );
}
