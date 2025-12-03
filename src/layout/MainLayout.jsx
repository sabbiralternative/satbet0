import { Outlet } from "react-router-dom";
import Navbar from "../components/UI/Navbar/Navbar";
import Footer from "../components/UI/Footer/Footer";
import MobileNavMenu from "../components/UI/MobileNavMenu/MobileNavMenu";

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <MobileNavMenu />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
