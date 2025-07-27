// src/shared/ui/sidebar/SidebarContent.tsx
import { ReactNode } from "react";

const SidebarContent = ({ children }: { children: ReactNode }) => {
    return <div className="h-full overflow-y-auto p-4">{children}</div>;
};

export default SidebarContent;
