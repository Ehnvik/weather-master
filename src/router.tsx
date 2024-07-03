import { createBrowserRouter } from "react-router-dom";
import { Today } from "./pages/Today/Today";
import { NavLayout } from "./components/NavLayout/NavLayout";

export const router = createBrowserRouter([
  {
    element: <NavLayout />,
    children: [
      {
        path: "/",
        element: <Today />,
        index: true,
      },
    ],
  },
]);
