import { Menu, ConfigProvider } from "antd";
import { DatabaseOutlined } from "@ant-design/icons";
import { TbReportAnalytics } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";

import { useEffect } from "react";

import { GoWorkflow } from "react-icons/go";

import { collapsedStore } from "../../../store/Store";
import { useRecoilState } from "recoil";

// eslint-disable-next-line no-unused-vars, react/prop-types
const MenuList = ({ darkTheme, toggleTheme }) => {
  const navigate = useNavigate();
  const currentPath = window.location.pathname;

  const iconStyle = { fontSize: "26px", marginRight: "5px", marginTop: "7px" };

  const [collapsed, setCollapsed] = useRecoilState(collapsedStore);

  return (
    <div>
      <ConfigProvider
        theme={{
          token: {
            // colorPrimary: "#EF86F1",
            // colorPrimary: "#ED5EF0",
            colorPrimary: "#aa3dac",
          },
        }}
      >
        <Menu
          theme={darkTheme ? "dark" : "light"}
          mode="inline"
          className="menu-bar"
          selectedKeys={[currentPath]}
        >
          <Menu.Item key="/admin" icon={<DatabaseOutlined style={iconStyle} />}>
            <Link to="/admin" onClick={() => setCollapsed(!collapsed)}>
              ข้อมูลพื้นฐาน
            </Link>
          </Menu.Item>
          <Menu.Item
            key="/admin/process"
            icon={<GoWorkflow style={iconStyle} />}
          >
            <Link to="/admin/process" onClick={() => setCollapsed(!collapsed)}>
              Process
            </Link>
          </Menu.Item>
          <Menu.Item
            key="/admin/report"
            icon={<TbReportAnalytics style={iconStyle} />}
          >
            <Link to="/admin/report" onClick={() => setCollapsed(!collapsed)}>
              รายงาน
            </Link>
          </Menu.Item>
        </Menu>
      </ConfigProvider>
    </div>
  );
};

export default MenuList;
