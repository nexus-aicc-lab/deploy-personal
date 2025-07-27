// src/shared/ui/sidebar/SidebarGroupLabel.tsx
import { ReactNode } from "react";

export default function SidebarGroupLabel({ children }: { children: ReactNode }) {
  return (
    <h3 className="px-3 mt-3 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
      {children}
    </h3>
  );
}


