"use client"

import * as React from "react"
import { ThemeProviderContext, type ThemeProviderState } from "@/contexts/theme-context"

export function useTheme(): ThemeProviderState {
  const context = React.useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider")

  return context
}
