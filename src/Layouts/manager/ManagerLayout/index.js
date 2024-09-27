import { Layout } from "antd";
import "./ManagerLayout.scss";
import { Outlet } from "react-router-dom";
import ManagerHeader from "../../../Components/Manager/ManagerHeader/ManagerHeader";
import MenuSider from "../../../Components/Manager/MenuSider/index";
import { useSelector } from "react-redux";
import ManagerFooter from "../../../Components/Manager/ManagerFooter/ManagerFooter";

const { Content, Sider } = Layout;

function ManagerLayout() {
  const collapse = useSelector((state) => state.collapseReducer);

  return (
    <Layout className="manager-layout" style={{ minHeight: "100vh" }}>
      <ManagerHeader />
      <Layout className="manager-layout__inner">
        <Sider
          theme="light"
          collapsed={collapse}
          className="manager-layout__sider"
          style={{
            overflow: "auto",
            height: "calc(100vh - 64px)",
            position: "fixed",
            left: 0,
          }}
        >
          <MenuSider />
        </Sider>
        <Layout className={`manager-layout__content ${collapse ? "manager-layout__content--collapsed" : "manager-layout__content--expanded"}`}>
          <Content
            className="manager-layout__content-inner"
            style={{ overflow: "auto", padding: "0px" }}
          >
            <Outlet />
            <ManagerFooter />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default ManagerLayout;
