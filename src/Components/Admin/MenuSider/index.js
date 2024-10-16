import React from "react";
import { Menu } from "antd";
import {
  HighlightOutlined,
  InsertRowAboveOutlined,
  ContactsOutlined,
  DashboardOutlined,
} from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import { LiaUserTieSolid } from "react-icons/lia";
import { FiUser } from "react-icons/fi";
import { MdOutlineDiscount } from "react-icons/md";

function MenuSider() {
  const location = useLocation();
  const currentPath = location.pathname;

  const items = [
    {
      label: <Link to="/admin/dashboard">Dashboard</Link>,
      icon: <DashboardOutlined />,
      key: "/admin/dashboard",
    },
    {
      label: "Employee",
      icon: <ContactsOutlined />,
      key: "Employee",
      children: [
        {
          label: <Link to="/admin/manager">Manager</Link>,
          icon: <LiaUserTieSolid />,
          key: "/admin/manager",
        } 
      ],
    },
    {
      label: <Link to="/admin/service">Service</Link>,
      icon: <HighlightOutlined />,
      key: "/admin/service",
    },
    {
      label: <Link to="/admin/voucher">Voucher</Link>,
      icon: <MdOutlineDiscount />,
      key: "/admin/voucher",
    },
    {
      label: <Link to="/admin/customer">Customer</Link>,
      icon: <FiUser />,
      key: "/admin/customer",
    },
  ];

  return (
    <Menu
      mode="inline"
      defaultOpenKeys={["Employee"]}
      selectedKeys={[currentPath]}
      items={items}
      style={{ height: "100%", borderRight: 0 }}
    />
  );
}

export default MenuSider;
