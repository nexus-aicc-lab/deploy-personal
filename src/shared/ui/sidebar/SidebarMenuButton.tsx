// src/shared/ui/sidebar/SidebarMenuButton.tsx
import { Slot } from "@radix-ui/react-slot";

interface SidebarMenuButtonProps {
    children: React.ReactNode;
    asChild?: boolean;
}

export default function SidebarMenuButton({ children, asChild }: SidebarMenuButtonProps) {
    const Comp = asChild ? Slot : "button";

    return (
        <Comp
            className="w-full text-left group transition-all duration-200 ease-in-out"
        >
            {children}
        </Comp>
    );
}
