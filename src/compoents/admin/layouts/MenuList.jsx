import { Menu } from "antd";
import { DatabaseOutlined } from "@ant-design/icons";
import { TbReportAnalytics } from "react-icons/tb";
import { Link } from "react-router-dom";

import { GoWorkflow } from "react-icons/go";

const MenuList = ({ darkTheme, toogleTheme }) => {
  const iconStyle = { fontSize: "26px", marginRight: "5px" };

  return (
    <div>
      <Menu
        theme={darkTheme ? "dark" : "light"}
        mode="inline"
        className="menu-bar"
      >
        <Menu.Item key="database" icon={<DatabaseOutlined style={iconStyle} />}>
          <Link to="/admin">ข้อมูลพื้นฐาน</Link>
        </Menu.Item>
        <Menu.Item key="process" icon={<GoWorkflow style={iconStyle} />}>
          <Link to="/admin/process">Process</Link>
        </Menu.Item>
        <Menu.Item key="report" icon={<TbReportAnalytics style={iconStyle} />}>
          <Link to="/admin/report">รายงาน</Link>
        </Menu.Item>

        {/* <Menu.SubMenu key="subtasks" title="Task" icon={<TbReportAnalytics />}>
          <Menu.Item key="task-1" icon={<TbReportAnalytics />}>
            1
          </Menu.Item>
          <Menu.Item key="task-2" icon={<TbReportAnalytics />}>
            2
          </Menu.Item>
        </Menu.SubMenu> */}
      </Menu>
    </div>
  );
};

export default MenuList;
