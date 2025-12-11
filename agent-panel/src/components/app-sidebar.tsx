"use client"

import * as React from "react"
import {
  LayoutDashboard,
  Gamepad2,
  Wallet,
  ArrowLeftRight,
  Link2,
  Settings,
  LogOut,
  ChevronRight,
  CircleDollarSign,
  Sliders,
  History,
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

interface Agent {
  id: string
  name: string
  email: string
  spinCredits: number
}

const navItems = [
  {
    label: "Créditos e Consumo",
    items: [
      {
        title: "Visão Geral",
        url: "/dashboard",
        icon: LayoutDashboard,
      },
      {
        title: "Histórico de Transações",
        url: "/dashboard/transactions",
        icon: ArrowLeftRight,
      },
    ],
  },
  {
    label: "Pool de Liquidez",
    items: [
      {
        title: "Painel de Controle",
        url: "/dashboard/pool",
        icon: Wallet,
      },
      {
        title: "Editar Métricas",
        url: "/dashboard/pool/settings",
        icon: Sliders,
      },
    ],
  },
  {
    label: "Jogos",
    items: [
      {
        title: "PGSoft",
        url: "/dashboard/games",
        icon: Gamepad2,
      },
    ],
  },
  {
    label: "Sistema",
    items: [
      {
        title: "Integração",
        url: "/dashboard/integration",
        icon: Link2,
      },
      {
        title: "Configurações",
        url: "/dashboard/settings",
        icon: Settings,
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
  const [agent, setAgent] = React.useState<Agent | null>(null)

  React.useEffect(() => {
    const agentData = localStorage.getItem("agentData")
    if (agentData) {
      setAgent(JSON.parse(agentData))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("agentToken")
    localStorage.removeItem("agentData")
    router.push("/")
  }

  const shouldBeOpen = (item: typeof navItems[0]["items"][0]) => {
    if (pathname === item.url) return true
    return item.items?.some((subItem) => pathname === subItem.url) || false
  }

  return (
    <Sidebar variant={variant} collapsible={collapsible} side={side}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard">
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
                    Painel do Agente
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
                    {item.items?.length ? (
                      <>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton
                            tooltip={item.title}
                            isActive={pathname.startsWith(item.url)}
                          >
                            {item.icon && <item.icon />}
                            <span>{item.title}</span>
                            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.items?.map((subItem) => (
                              <SidebarMenuSubItem key={subItem.title}>
                                <SidebarMenuSubButton
                                  asChild
                                  isActive={pathname === subItem.url}
                                >
                                  <Link href={subItem.url}>
                                    <span>{subItem.title}</span>
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </>
                    ) : (
                      <SidebarMenuButton
                        asChild
                        tooltip={item.title}
                        isActive={pathname === item.url}
                      >
                        <Link href={item.url}>
                          {item.icon && <item.icon />}
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    )}
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
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-accent">
                    <CircleUser className="size-5" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">
                      {agent?.name || "Carregando..."}
                    </span>
                    <span className="truncate text-xs text-muted-foreground">
                      {agent?.email || ""}
                    </span>
                  </div>
                  <EllipsisVertical className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-56 rounded-lg"
                side="right"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted">
                      <CircleUser className="size-5" />
                    </div>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-medium">
                        {agent?.name}
                      </span>
                      <span className="truncate text-xs text-muted-foreground">
                        {agent?.email}
                      </span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/settings">
                    <Settings className="mr-2 size-4" />
                    Configurações
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-destructive focus:text-destructive"
                >
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
