import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import DashboardNavbar from "../DashboardNavbar/DashboardNavbar";
import Sidebar from "./Sidebar";

const { Content } = Layout;

const MainLayout = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar />
      <Layout>
        <DashboardNavbar />
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
