// src/shared/ui/sidebar/SidebarMenu.tsx
import { ReactNode } from "react";

export default function SidebarMenu({ children }: { children: ReactNode }) {
    return <ul className="space-y-1">{children}</ul>;
}
