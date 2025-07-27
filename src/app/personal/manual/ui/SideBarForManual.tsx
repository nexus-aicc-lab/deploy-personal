'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
    Home,
    Download,
    LogIn,
    BookOpen,
    Settings,
    ChevronRight,
    ChevronDown,
    FileText,
    Users,
    HelpCircle,
    Shield,
    Terminal,
    Zap,
    Key,
    UserPlus,
    Database,
    Globe,
    Lock,
    AlertCircle,
    FileCode,
    History,
} from "lucide-react"
import { useEffect, useState, useRef } from "react"
import { cn } from "@/lib/utils"

interface MenuItem {
    label: string
    href?: string
    icon: any
    children?: MenuItem[]
}

// Ripple 효과 컴포넌트
function Ripple({ parentRef }: { parentRef: React.RefObject<HTMLElement | null> }) {
    const [ripples, setRipples] = useState<{ x: number; y: number; size: number; id: number }[]>([])

    useEffect(() => {
        const parent = parentRef.current
        if (!parent) return

        const handleClick = (e: MouseEvent) => {
            const rect = parent.getBoundingClientRect()
            const size = Math.max(rect.width, rect.height) * 2
            const x = e.clientX - rect.left - size / 2
            const y = e.clientY - rect.top - size / 2
            const id = Date.now()

            setRipples(prev => [...prev, { x, y, size, id }])

            setTimeout(() => {
                setRipples(prev => prev.filter(ripple => ripple.id !== id))
            }, 600)
        }

        parent.addEventListener('click', handleClick)
        return () => parent.removeEventListener('click', handleClick)
    }, [parentRef])

    return (
        <>
            {ripples.map(ripple => (
                <span
                    key={ripple.id}
                    className="absolute rounded-full bg-current opacity-10 pointer-events-none"
                    style={{
                        left: ripple.x,
                        top: ripple.y,
                        width: ripple.size,
                        height: ripple.size,
                        animation: 'ripple 600ms ease-out',
                    }}
                />
            ))}
            <style jsx>{`
                @keyframes ripple {
                    from {
                        transform: scale(0);
                        opacity: 0.3;
                    }
                    to {
                        transform: scale(1);
                        opacity: 0;
                    }
                }
            `}</style>
        </>
    )
}

const menuGroups: { label: string; items: MenuItem[] }[] = [
    {
        label: "시작하기",
        items: [
            // { label: "개요", href: "/personal/manual/overview", icon: Home },
            {
                label: "빠른 시작",
                icon: Zap,
                children: [
                    { label: "개요", href: "/personal/manual/overview", icon: FileText },
                    { label: "기본 설치", href: "/personal/manual/installation", icon: Settings },
                ]
            },
        ]
    },
    {
        label: "설치 및 설정",
        items: [
            {
                label: "설치",
                icon: Download,
                children: [
                    { label: "시스템 요구사항", href: "/personal/manual/requirements", icon: AlertCircle },
                    { label: "Windows 설치", href: "/personal/manual/install-windows", icon: Terminal },
                    { label: "MacOS 설치", href: "/personal/manual/install-macos", icon: Terminal },
                    { label: "Linux 설치", href: "/personal/manual/install-linux", icon: Terminal },
                ]
            },
            {
                label: "인증",
                icon: Key,
                children: [
                    { label: "로그인", href: "/personal/manual/login", icon: LogIn },
                    { label: "회원가입", href: "/personal/manual/signup", icon: UserPlus },
                    { label: "비밀번호 재설정", href: "/personal/manual/reset-password", icon: Lock },
                ]
            },
            {
                label: "환경 설정",
                icon: Settings,
                children: [
                    { label: "기본 설정", href: "/personal/manual/general-settings", icon: Settings },
                    { label: "데이터베이스", href: "/personal/manual/database", icon: Database },
                    { label: "네트워크", href: "/personal/manual/network", icon: Globe },
                ]
            },
        ],
    },
    {
        label: "주요 기능",
        items: [
            {
                label: "대시보드",
                icon: Terminal,
                children: [
                    { label: "메인 화면", href: "/personal/manual/dashboard-main", icon: Home },
                    { label: "위젯 관리", href: "/personal/manual/widgets", icon: Terminal },
                    { label: "리포트", href: "/personal/manual/reports", icon: FileText },
                ]
            },
            {
                label: "사용자 관리",
                icon: Users,
                children: [
                    { label: "사용자 목록", href: "/personal/manual/user-list", icon: Users },
                    { label: "권한 설정", href: "/personal/manual/permissions", icon: Shield },
                    { label: "그룹 관리", href: "/personal/manual/groups", icon: Users },
                ]
            },
            {
                label: "보안",
                icon: Shield,
                children: [
                    { label: "보안 정책", href: "/personal/manual/security-policy", icon: Shield },
                    { label: "2단계 인증", href: "/personal/manual/2fa", icon: Lock },
                    { label: "감사 로그", href: "/personal/manual/audit-logs", icon: History },
                ]
            },
        ],
    },
    {
        label: "참고 자료",
        items: [
            {
                label: "문서",
                icon: BookOpen,
                children: [
                    { label: "API 레퍼런스", href: "/personal/manual/api-reference", icon: FileCode },
                    { label: "가이드", href: "/personal/manual/guides", icon: BookOpen },
                    { label: "예제 코드", href: "/personal/manual/examples", icon: FileCode },
                ]
            },
            { label: "FAQ", href: "/personal/manual/faq", icon: HelpCircle },
            { label: "변경 이력", href: "/personal/manual/changelog", icon: History },
        ],
    },
]

function SidebarGroup({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div className="mb-3">
            <h3 className="px-2 mb-1 text-[11px] font-semibold text-gray-500 uppercase tracking-wide">
                {label}
            </h3>
            <div className="space-y-0">{children}</div>
        </div>
    )
}

function SidebarMenuItem({ item, depth = 0 }: { item: MenuItem; depth?: number }) {
    const pathname = usePathname()
    const isActive = pathname === item.href
    const hasActiveChild = item.children?.some(child =>
        child.href === pathname || child.children?.some(grandchild => grandchild.href === pathname)
    ) ?? false

    const [isOpen, setIsOpen] = useState(hasActiveChild)
    const buttonRef = useRef<HTMLButtonElement>(null)
    const linkRef = useRef<HTMLAnchorElement>(null)

    useEffect(() => {
        if (hasActiveChild) setIsOpen(true)
    }, [hasActiveChild])

    const paddingLeft = `${8 + (depth * 12)}px`

    if (item.children) {
        return (
            <div>
                <button
                    ref={buttonRef}
                    onClick={() => setIsOpen(!isOpen)}
                    className={cn(
                        "relative w-full flex items-center justify-between py-1.5 text-[13px] rounded transition-all duration-150 overflow-hidden",
                        "hover:bg-gray-100 dark:hover:bg-gray-800",
                        (isOpen || hasActiveChild) && "bg-gray-50 dark:bg-gray-800/50 font-medium"
                    )}
                    style={{ paddingLeft, paddingRight: '4px' }}
                >
                    <Ripple parentRef={buttonRef} />
                    <span className="flex items-center gap-2 relative z-10">
                        <item.icon className={cn(
                            "w-3.5 h-3.5",
                            (isOpen || hasActiveChild) ? "text-gray-700" : "text-gray-500"
                        )} />
                        <span className={cn(
                            (isOpen || hasActiveChild) ? "text-gray-900 dark:text-gray-100" : "text-gray-700 dark:text-gray-300"
                        )}>{item.label}</span>
                    </span>
                    <ChevronRight className={cn(
                        "w-3 h-3 text-gray-400 transition-transform duration-150 relative z-10",
                        isOpen && "rotate-90"
                    )} />
                </button>

                <div className={cn(
                    "overflow-hidden transition-all duration-150",
                    isOpen ? "max-h-96" : "max-h-0"
                )}>
                    <div className="mt-0.5 space-y-0">
                        {item.children.map((child, index) => (
                            <SidebarMenuItem
                                key={`${child.href || child.label}-${index}`}
                                item={child}
                                depth={depth + 1}
                            />
                        ))}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <Link
            ref={linkRef}
            href={item.href!}
            className={cn(
                "relative flex items-center gap-2 py-1.5 text-[13px] rounded transition-all duration-150 overflow-hidden",
                isActive ? (
                    "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400 font-medium"
                ) : (
                    "text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100"
                )
            )}
            style={{ paddingLeft, paddingRight: '8px' }}
        >
            <Ripple parentRef={linkRef} />
            <item.icon className={cn(
                "w-3.5 h-3.5 relative z-10",
                isActive ? "text-blue-600 dark:text-blue-400" : "text-gray-400"
            )} />
            <span className="relative z-10">{item.label}</span>
        </Link>
    )
}

export default function SidebarForManual() {
    return (
        <aside className="w-56 h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 overflow-y-auto">
            <div className="py-3 px-2">
                <div className="mb-4 pb-3 border-b border-gray-200 dark:border-gray-800">
                    <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100 px-2">
                        매뉴얼
                    </h2>
                </div>

                <nav>
                    {menuGroups.map((group, index) => (
                        <SidebarGroup key={`group-${index}`} label={group.label}>
                            {group.items.map((item, itemIndex) => (
                                <SidebarMenuItem
                                    key={`${item.label}-${itemIndex}`}
                                    item={item}
                                />
                            ))}
                        </SidebarGroup>
                    ))}
                </nav>
            </div>
        </aside>
    )
}