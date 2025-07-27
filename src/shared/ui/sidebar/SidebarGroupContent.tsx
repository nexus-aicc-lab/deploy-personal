// src/shared/ui/sidebar/SidebarGroupContent.tsx
import { ReactNode } from "react";

export default function SidebarGroupContent({ children }: { children: ReactNode }) {
    return <div className="space-y-1">{children}</div>;
}
