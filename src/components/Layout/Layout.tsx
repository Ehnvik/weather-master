import "./Layout.scss";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = (props: LayoutProps) => {
  return <div className="layout">{props.children}</div>;
};
