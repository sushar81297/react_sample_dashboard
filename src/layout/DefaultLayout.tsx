import { Breadcrumb, Layout } from "antd";
import { Link, useLocation } from "react-router-dom";
import { ReactNode, useEffect, useState } from "react";

import HeaderMenu from "./HeaderMenu";
import SidebarNav from "./SidebarNav";

const { Content } = Layout;

interface Props {
  children: ReactNode;
}

export default function DefaultLayout({ children }: Props) {
  const pathname = useLocation().pathname.split("/")[1];
  const [collapsed, setCollapsed] = useState<boolean>(false);

  // Theme Color
  const primaryColor = "#1F3F49";
  const secondaryColor = "#488A99";
  const whiteColor = "#ffffff";

  // const primaryColor = "#A30962";
  // const secondaryColor = "#E6007E";
  // const whiteColor = "#ffffff";

  document.documentElement.style.setProperty("--primary-color", primaryColor);
  document.documentElement.style.setProperty(
    "--secondary-color",
    secondaryColor
  );
  document.documentElement.style.setProperty("--bg-color", whiteColor);

  const themeColor = {
    primaryColor,
    secondaryColor,
    whiteColor,
  };

  useEffect(() => {
    handleWindowResize();
    window.addEventListener("resize", () => {
      handleWindowResize();
    });
    return window.removeEventListener("resize", () => {
      handleWindowResize();
    });
  }, []);

  const handleWindowResize = () => {
    if (window.innerWidth < 992) setCollapsed(true);
    else setCollapsed(false);
  };
  return (
    <Layout hasSider>
      <SidebarNav collapsed={collapsed} themeColor={themeColor} />
      <Layout style={{ marginLeft: collapsed ? 80 : 250 }}>
        <HeaderMenu
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          themeColor={themeColor}
        />
        <Content style={{ margin: "80px 16px 0 16px", overflow: "initial" }}>
          <Breadcrumb
            items={[
              { title: <Link to="/home">Home</Link> },
              { title: pathname },
            ]}
          />
          <div className="content-container">{children}</div>
        </Content>
      </Layout>
    </Layout>
  );
}
