import { Airplane } from "../Animations/Airplane/Airplane";
import { Clouds } from "../Animations/Clouds/Clouds";
import "./Layout.scss";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="background">
      <Clouds />
      <Airplane />
      <div className="layout">{children}</div>
    </div>
  );
};
