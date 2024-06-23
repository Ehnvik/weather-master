import { Outlet } from "react-router-dom";
import { Navbar } from "../Navbar/Navbar";
import { Layout } from "../Layout/Layout";
import { WeatherProvider } from "../../contexts/WeatherContext";

export const NavLayout = () => {
  return (
    <WeatherProvider>
      <Layout>
        <Navbar />
        <Outlet />
      </Layout>
    </WeatherProvider>
  );
};
