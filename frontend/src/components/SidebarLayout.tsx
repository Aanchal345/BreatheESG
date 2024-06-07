import React, { useState } from "react";
import { Layout, Menu, message } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  BarChartOutlined,
  InsertRowBelowOutlined,
  CalculatorOutlined,
  BookOutlined,
  TeamOutlined,
  DatabaseOutlined,
  LineChartOutlined,
  DollarOutlined,
  LogoutOutlined,
  BellOutlined,
  UserOutlined
} from "@ant-design/icons";
import { Link,useLocation } from "react-router-dom";

const { Header, Sider, Content } = Layout;

interface SidebarLayoutProps {
  children: React.ReactNode;
}

const SidebarLayout: React.FC<SidebarLayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const getDefaultSelectedKey = () => {
    const pathName = location.pathname;
    switch (pathName) {
      case "/":
        return ["1"];
      case "/entry-manager":
        return ["2"];
      case "/data-manager":
        return ["3"];
      case "/reporting":
        return ["4"];
      case "/materiality":
        return ["5"];
      case "/suppliers":
        return ["6"];
      case "/analytics":
        return ["7"];
      case "/targets":
        return ["8"];
      default:
        return ["1"];
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{ backgroundColor: "#001529" }}
      >
        {!collapsed && (
          <div style={{display:"flex",justifyContent:"center",alignItems:"center",color:"white"}}>
            <h2>BREATHE <span>ESG</span></h2>
          </div>
        )}

        {collapsed && (
          <div className="logo"/>
        )}
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={getDefaultSelectedKey()}
          items={[
            {
              key: "1",
              label: <Link to="/">Dashboard</Link>,
              icon: <BarChartOutlined />,
            },
            {
              key: "2",
              label: <Link to="/entry-manager">Entry Manager</Link>,
              icon: <InsertRowBelowOutlined />,
            },
            {
              key: "3",
              label: <Link to="/data-manager">Data Manager</Link>,
              icon: <CalculatorOutlined />,
            },
            {
              key: "4",
              label: <Link to="/reporting">Reporting</Link>,
              icon: <BookOutlined />,
            },
            {
              key: "5",
              label: <Link to="/materiality">Materiality</Link>,
              icon: <DatabaseOutlined />,
            },
            {
              key: "6",
              label: <Link to="/suppliers">Suppliers</Link>,
              icon: <TeamOutlined />,
            },
            {
              key: "7",
              label: <Link to="/analytics">Analytics</Link>,
              icon: <LineChartOutlined />,
            },
            {
              key: "8",
              label: <Link to="/targets">Targets</Link>,
              icon: <DollarOutlined />,
            },
            {
              key: "9",
              label: "Logout",
              icon: <LogoutOutlined />,
              onClick: () => {
                window.location.href = "/login";
                localStorage.removeItem("token");
                message.success("Logged out successfully");
              }
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: toggleCollapsed,
            }
          )}
          <div style={{display:"flex",flexDirection:"row",gap:20,margin:20}}>
            <BellOutlined />
            <div style={{ color: "black" }}>John Doe</div>
            <UserOutlined />
          </div>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default SidebarLayout;
