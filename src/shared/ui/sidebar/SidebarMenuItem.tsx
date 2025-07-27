// src/shared/ui/sidebar/SidebarMenuItem.tsx
import { ReactNode } from "react";

export default function SidebarMenuItem({ children }: { children: ReactNode }) {
    return <li>{children}</li>;
}
