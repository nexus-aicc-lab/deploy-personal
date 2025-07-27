// src/shared/ui/sidebar/SidebarGroupLabel.tsx
import { ReactNode } from "react";

export default function SidebarGroupLabel({ children }: { children: ReactNode }) {
  return <h3 className="text-xs font-bold text-muted-foreground mb-1">{children}</h3>;
}
