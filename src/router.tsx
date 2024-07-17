import { createBrowserRouter } from "react-router-dom";
import { NavLayout } from "./components/NavLayout/NavLayout";
import { WeatherOverview } from "./pages/WeatherOverview/WeatherOverview";

export const router = createBrowserRouter([
  {
    element: <NavLayout />,
    children: [
      {
        path: "/",
        element: <WeatherOverview />,
        index: true,
      },
      {
        path: "/search/:id",
        element: <WeatherOverview />,
      },
    ],
  },
]);
