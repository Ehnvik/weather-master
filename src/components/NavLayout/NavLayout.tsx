import { Outlet } from "react-router-dom";
import { Navbar } from "../Navbar/Navbar";
import { Layout } from "../Layout/Layout";

export const NavLayout = () => {
  return (
    <Layout>
      <Navbar />
      <Outlet />
    </Layout>
  );
};
