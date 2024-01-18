/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import { Button, Layout, theme, Dropdown, Avatar } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Logo from "./Logo";
import MenuList from "./MenuList";
import ThemeButton from "./ThemeButton";
import { Outlet, Link } from "react-router-dom";

const { Header, Sider, Content } = Layout;

const items = [
  {
    key: "1",
    label: <Link to="/admin/about">ข้อมูลส่วนตัว</Link>,
  },
  {
    key: "2",
    label: <Link to="/login">ออกจากระบบ</Link>,
  },
];

export function HomeAdmin() {
  const [darkTheme, setDarkTheme] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  };

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout>
      <Sider
        collapsed={collapsed}
        collapsible
        trigger={null}
        theme={darkTheme ? "dark" : "light"}
        className="sidebar"
      >
        <Logo darkTheme={darkTheme} toggleTheme={toggleTheme} />
        <MenuList darkTheme={darkTheme} toggleTheme={toggleTheme} />
        <ThemeButton darkTheme={darkTheme} toggleTheme={toggleTheme} />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <div className="flex h-[100%] justify-between items-center pr-10">
            <Button
              type="text"
              className="toggle"
              onClick={() => setCollapsed(!collapsed)}
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            ></Button>
            <Dropdown
              menu={{
                items,
              }}
              placement="bottom"
              arrow
            >
              <Avatar icon={<UserOutlined />}>
                <Button>bottom</Button>
              </Avatar>
            </Dropdown>
          </div>
        </Header>
        <Content style={{ padding: "15px" }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}

export default HomeAdmin;
