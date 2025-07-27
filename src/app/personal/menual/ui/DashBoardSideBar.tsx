'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

import {
    Home,
    Calendar,
    LogIn,
    BookOpen,
    Settings,
} from "lucide-react";

import Sidebar from "@/shared/ui/sidebar/Sidebar";
import SidebarContent from "@/shared/ui/sidebar/SidebarContent";
import SidebarGroup from "@/shared/ui/sidebar/SidebarGroup";
import SidebarGroupLabel from "@/shared/ui/sidebar/SidebarGroupLabel";
import SidebarGroupContent from "@/shared/ui/sidebar/SidebarGroupContent";
import SidebarMenu from "@/shared/ui/sidebar/SidebarMenu";
import SidebarMenuItem from "@/shared/ui/sidebar/SidebarMenuItem";
import SidebarMenuButton from "@/shared/ui/sidebar/SidebarMenuButton";

const menuGroups = [
    {
        label: "앱 개요",
        items: [
            { label: "개요", href: "/personal/menual/overview", icon: Home },
        ],
    },
    {
        label: "설치 및 사용법",
        items: [
            { label: "설치 방법", href: "/personal/menual/install", icon: Calendar },
            { label: "로그인/로그아웃", href: "/personal/menual/login", icon: LogIn },
        ],
    },
    {
        label: "기타 문서",
        items: [
            { label: "문서", href: "/docs", icon: BookOpen },
            { label: "설정", href: "/settings", icon: Settings },
        ],
    },
];

export default function SidebarForMenual() {
    const pathname = usePathname();

    return (
        <Sidebar className="w-64 border-r h-screen bg-muted">
            <SidebarContent>
                {menuGroups.map((group) => (
                    <SidebarGroup key={group.label}>
                        <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {group.items.map((item) => (
                                    <SidebarMenuItem key={item.href}>
                                        <SidebarMenuButton asChild>
                                            <Link
                                                href={item.href}
                                                className={cn(
                                                    "flex items-center gap-2 px-3 py-2 rounded-md transition-all",
                                                    pathname === item.href
                                                        ? "bg-primary text-primary-foreground font-semibold"
                                                        : "hover:bg-accent hover:text-accent-foreground"
                                                )}
                                            >
                                                <item.icon className="w-4 h-4" />
                                                <span>{item.label}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>
        </Sidebar>
    );
}
