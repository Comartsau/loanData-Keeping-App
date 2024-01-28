/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
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

import { useRecoilState } from "recoil";
import { locationStore } from "../../../store/Store";

import { getLocation } from "../../../api/locationApi";

const { Header, Sider, Content } = Layout;

const handleLogout = () => {
  // ลบข้อมูลใน localStorage
  localStorage.clear();

  // โหลดหน้าใหม่
  window.location.reload();
};

const items = [
  {
    key: "1",
    label: <Link to="/admin/about">ข้อมูลส่วนตัว</Link>,
  },
  {
    key: "2",
    label: <span onClick={handleLogout}>ออกจากระบบ</span>,
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

  const [searchQuery, setSearchQuery] = useState("");
  const [dataLocationStore, setDataLocationStore] =
    useRecoilState(locationStore);

  const fetchLocation = async () => {
    try {
      const response = await getLocation(searchQuery);
      setDataLocationStore(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  return (
    <Layout>
      <Sider
        collapsed={collapsed}
        collapsible
        trigger={null}
        theme={darkTheme ? "dark" : "light"}
        className="sidebar"
        style={{ display: collapsed ? "none" : "block" }}
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
            {/* <Typography>ระบบเก็บข้อมูล</Typography> */}
            <Dropdown
              menu={{
                items,
              }}
              placement="bottom"
              arrow
            >
              <Avatar icon={<UserOutlined />}></Avatar>
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
