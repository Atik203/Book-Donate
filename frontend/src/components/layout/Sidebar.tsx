import { Layout, Menu, MenuProps } from "antd";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { adminPaths } from "../../routes/admin.routes";

import { RootState } from "../../redux/store";
import { userPaths } from "../../routes/user.routes";
import { sidebarItemsGenerator } from "../../utils/sidebarItemsGenerator";

const { Sider } = Layout;

const userRole = {
  ADMIN: "Admin",
  USER: "User",
};

const Sidebar = () => {
  const user = useAppSelector((state: RootState) => state.user.user);

  const role = user?.role;
  let sidebarItems;

  switch (role) {
    case userRole.ADMIN:
      sidebarItems = sidebarItemsGenerator(adminPaths, userRole.ADMIN);
      break;
    case userRole.USER:
      sidebarItems = sidebarItemsGenerator(userPaths, userRole.USER);
      break;
    default:
      break;
  }

  return (
    <Sider breakpoint="lg" collapsedWidth="0">
      <div
        style={{
          color: "white",
          textAlign: "center",
          height: "4rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Link to={"/"} className="flex items-center gap-1">
          <img
            src="https://i.ibb.co/SfJ74Bj/logo.png"
            alt=""
            className="h-8 w-8"
          />
          <p className="font-bold tracking-wider md:text-xl text-lg lg:text-2xl">
            Book<span className="text-navPrimary">Donate</span>
          </p>
        </Link>
      </div>

      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["4"]}
        items={sidebarItems as MenuProps["items"]}
      />
    </Sider>
  );
};

export default Sidebar;
