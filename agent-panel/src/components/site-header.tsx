"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { ModeToggle } from "@/components/mode-toggle"
import { Badge } from "@/components/ui/badge"
import { Wallet } from "lucide-react"

interface Agent {
  spinCredits: number
}

export function SiteHeader() {
  const [agent, setAgent] = React.useState<Agent | null>(null)

  React.useEffect(() => {
    const agentData = localStorage.getItem("agentData")
    if (agentData) {
      setAgent(JSON.parse(agentData))
    }
  }, [])

  const credits = Math.floor(Number(agent?.spinCredits || 0))

  return (
    <header className="flex h-14 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-14">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        
        <div className="flex-1" />
        
        <div className="flex items-center gap-3">
          {/* Spin Credits */}
          <div className="flex items-center gap-2 rounded-lg border bg-card px-3 py-1.5">
            <Wallet className="size-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Créditos:</span>
            <Badge variant={credits > 0 ? "success" : "destructive"}>
              {credits.toLocaleString("pt-BR")}
            </Badge>
          </div>
          
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
