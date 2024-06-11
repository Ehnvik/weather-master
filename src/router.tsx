import { createBrowserRouter } from "react-router-dom";
import { Today } from "./pages/Today/Today";
import { NavLayout } from "./components/NavLayout/NavLayout";
import { Hourly } from "./pages/Hourly/Hourly";
import { Daily } from "./pages/Daily/Daily";

export const router = createBrowserRouter([
  {
    element: <NavLayout />,
    children: [
      {
        path: "/",
        element: <Today />,
        index: true,
      },
      {
        path: "/hourly",
        element: <Hourly />,
      },
      {
        path: "/daily",
        element: <Daily />,
      },
    ],
  },
]);
