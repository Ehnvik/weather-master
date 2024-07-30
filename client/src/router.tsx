import { createBrowserRouter } from "react-router-dom";
import { App } from "./components/Layouts/App/App";
import { WeatherOverview } from "./pages/WeatherOverview/WeatherOverview";

export const router = createBrowserRouter([
  {
    element: <App />,
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
