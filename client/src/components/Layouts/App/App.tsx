import { Outlet } from "react-router-dom";
import { Navbar } from "../../Navbar/Navbar";
import { Layout } from "../Layout/Layout";
import { WeatherProvider } from "../../../contexts/WeatherContext";
import { LocationProvider } from "../../../contexts/LocationContext";

export const App = () => {
  return (
    <WeatherProvider>
      <LocationProvider>
        <Layout>
          <Navbar />
          <Outlet />
        </Layout>
      </LocationProvider>
    </WeatherProvider>
  );
};
