import type { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = (props: LayoutProps) => {
  return <div className="border-t border-neutral-800">{props.children}</div>;
};

export default Layout;
