import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import NavbarComponent from "../components/Navbar/NavbarComponent";

const Root = () => {
  return (
    <div className="mx-auto">
      <NavbarComponent></NavbarComponent>
      <div className="max-w-7xl mx-auto">
        <Outlet></Outlet>
      </div>
      <Footer />
    </div>
  );
};

export default Root;
