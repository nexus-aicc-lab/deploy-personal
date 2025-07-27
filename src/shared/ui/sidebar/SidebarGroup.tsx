// src/shared/ui/sidebar/SidebarGroup.tsx
import { ReactNode } from "react";

export default function SidebarGroup({ children }: { children: ReactNode }) {
    return <div className="mb-4">{children}</div>;
}
