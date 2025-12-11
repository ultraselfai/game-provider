"use client"

import * as React from "react"
import {
  LayoutDashboard,
  Users,
  Gamepad2,
  MonitorPlay,
  ArrowLeftRight,
  Wallet,
  LogOut,
  ChevronRight,
  Shield,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { EllipsisVertical, CircleUser } from "lucide-react"

const navItems = [
  {
    label: "Geral",
    items: [
      {
        title: "Dashboard",
        url: "/",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    label: "Gestão",
    items: [
      {
        title: "Agentes",
        url: "/agents",
        icon: Users,
      },
      {
        title: "Pools",
        url: "/pools",
        icon: Wallet,
      },
    ],
  },
  {
    label: "Jogos",
    items: [
      {
        title: "Catálogo",
        url: "/games",
        icon: Gamepad2,
      },
      {
        title: "Sessões",
        url: "/sessions",
        icon: MonitorPlay,
      },
    ],
  },
  {
    label: "Financeiro",
    items: [
      {
        title: "Transações",
        url: "/transactions",
        icon: ArrowLeftRight,
      },
    ],
  },
]

export function AppSidebar({
  variant = "inset",
  collapsible = "icon",
  side = "left",
}: {
  variant?: "sidebar" | "floating" | "inset"
  collapsible?: "offcanvas" | "icon" | "none"
  side?: "left" | "right"
}) {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = () => {
    document.cookie = 'admin_authenticated=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
    router.push("/login")
  }

  const shouldBeOpen = (item: typeof navItems[0]["items"][0]) => {
    if (pathname === item.url) return true
    return false
  }

  return (
    <Sidebar variant={variant} collapsible={collapsible} side={side}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg overflow-hidden">
                  <Image
                    src="/game-provider-simbol.png"
                    alt="Game Provider"
                    width={32}
                    height={32}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Game Provider</span>
                  <span className="truncate text-xs text-muted-foreground">
                    Painel Admin
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {navItems.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
            <SidebarMenu>
              {group.items.map((item) => (
                <Collapsible
                  key={item.title}
                  asChild
                  defaultOpen={shouldBeOpen(item)}
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      tooltip={item.title}
                      isActive={pathname === item.url}
                    >
                      <Link href={item.url}>
                        <item.icon className="size-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </Collapsible>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20">
                    <Shield className="size-4 text-primary" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">Administrador</span>
                    <span className="truncate text-xs text-muted-foreground">
                      admin@gameprovider.com
                    </span>
                  </div>
                  <EllipsisVertical className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20">
                      <Shield className="size-4 text-primary" />
                    </div>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">Administrador</span>
                      <span className="truncate text-xs text-muted-foreground">
                        admin@gameprovider.com
                      </span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive cursor-pointer">
                  <LogOut className="mr-2 size-4" />
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
