
import type { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => (
  <div className="h-full p-4 lg:p-6">{children}</div>
);

export default layout;
